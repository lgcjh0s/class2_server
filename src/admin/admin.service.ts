import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { Http } from "src/common/common.http";
import { IToken, ITopStoreReq } from "src/common/common.interfaces";
import { TopStore } from "src/entity/topstore.entity";
import { User } from "src/entity/user.entity";
import { keyStore } from "src/security/security.keys";
import { Repository } from "typeorm";

@Injectable()
export class AdminService extends BaseService {

    jsdom = require('jsdom');

    constructor (
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(TopStore)
        private topStoreRepository: Repository<TopStore>
    ) {
        super();
    }

    issueAccessToken(user: User): string {
        const payload = {
            userId: user.userId,
            userName: user.userName
        };
        const options = {
            secret: keyStore.getSecret(),
            expiresIn: '30m'
        };
        return this.jwtService.sign(payload, options);
    }

    async login(user: User): Promise<IToken> {

        const userId: string = user.userId;
        const dbUser: User | null = await this.userRepository.findOneBy({ userId });
    
        if (!dbUser || !dbUser.userId) {
            throw new NotFoundException('No such user');
        }
        if (dbUser.password !== user.password) {
            throw new UnauthorizedException('Wrong password');
        }
    
        return {
            accessToken: this.issueAccessToken(user)
        }
    }

    verify(token: string): void {
        try {
            const options = {
                secret: keyStore.getSecret()
            };
            this.jwtService.verify(token, options);
        } catch (e) {
            throw new UnauthorizedException('Unauthorized');
        }
    }
    async getUser(user: User): Promise<User> {
        const userId: string = user.userId;
        return await this.userRepository.findOneBy({ userId });
    }
    async scrapTopStores(drwNo: number): Promise<string> {

        const http: Http = new Http(Http.EUCKR);
        const url: string = 'https://dhlottery.co.kr/store.do?method=topStore&pageGubun=L645';
        const bodyData: ITopStoreReq = {
            method: 'topStore',
            nowPage: 1,
            rankNo: '',
            gameNo: 5133,
            drwNo: drwNo,
            schKey: '',
            schVal: ''
        };
    
        return await http.doPost(url, bodyData);
    }
    parseTopStores(drwNo: number, html: string): TopStore[] {

        const { JSDOM } = this.jsdom;
        const dom = new JSDOM('<html><body></body></html>');
    
        const div = dom.window.document.createElement('div');
        div.innerHTML = html;
    
        const tbl: HTMLTableElement = div.querySelectorAll('.tbl_data.tbl_data_col')[0];
        const rows: NodeList = tbl.querySelectorAll('tbody tr');
        const topStores: TopStore[] = [];
    
        rows.forEach((ele: HTMLTableRowElement) => {
            const tds: HTMLCollectionOf<HTMLTableCellElement> = ele.getElementsByTagName('td');
            const codeTd: string = tds[4].innerHTML.trim();
            const storeCode: string = codeTd.substring(codeTd.indexOf("'") + 1,
    codeTd.lastIndexOf("'"));
    
            const store: TopStore = {
                drwNo: drwNo,
                storeCode: storeCode,
                storeName: tds[1].innerHTML.trim(),
                addr: tds[3].innerHTML.trim(),
                lat: '',
                lon: '',
                telNo: ''
            };
            topStores.push(store);
        });
    
        return topStores;
    }
    

    async scrap(drwNo: number): Promise<TopStore[]> {

        await this.deleteTopStores(drwNo);
        
        const scrapHtml: string = await this.scrapTopStores(drwNo);
        let topStores: TopStore[] = this.parseTopStores(drwNo, scrapHtml);
    
        for (let inx=0; inx<topStores.length; inx++) {
            let store: TopStore = topStores[inx];
            const locHtml: string = await this.scrapStoreLocation(store.storeCode);
            store = this.parseStoreLocation(locHtml, store);
            topStores[inx] = store;

            await this.insertTopStore(store);
        }
    
        return topStores;
    }

    async deleteTopStores(drwNo: number): Promise<boolean> {
        const result = await this.topStoreRepository.delete({
            drwNo: drwNo
        });
        return !!result.affected;
    }
    
    
    async scrapStoreLocation(storeCode: string): Promise<string> {

        const http: Http = new Http(Http.EUCKR);
        const url: string = 'https://dhlottery.co.kr/store.do?method=topStoreLocation&gbn=lotto&rtlrId=' + storeCode;
        const html: string = await http.doPost(url);
        return html;
    }
    parseStoreLocation(html: string, store: TopStore): TopStore {

        const { JSDOM } = this.jsdom;
        const dom = new JSDOM('<html><body></body></html>');
        
        const div = dom.window.document.createElement('div');
        div.innerHTML = html;
        
        store.lat = div.querySelector('input[name=lat]').value;
        store.lon = div.querySelector('input[name=lon]').value;
        const tbl: HTMLTableElement = div.querySelectorAll('.tbl_data')[0];
        const trs = tbl.querySelectorAll('tbody tr');
        store.telNo = trs[1].getElementsByTagName('td')[0].innerHTML;
        
        return store;
    }
    async insertTopStore(topStore: TopStore): Promise<TopStore> {
        return await this.topStoreRepository.save(topStore);
    }
    async selectTopStores(drwNo: number): Promise<TopStore[]> {
        const topStores: TopStore[] = await this.topStoreRepository.find({
            where: { drwNo: drwNo }
        });
        return topStores;
    }
    
    
    
    
}