import { Body, Controller, Post, UnauthorizedException, Headers, UseGuards, Get, Query, Render } from "@nestjs/common";
import { BaseController } from "src/base/base.controller";
import { AdminService } from "./admin.service";
import { RespData } from "src/base/base.entity";
import { IToken } from "src/common/common.interfaces";
import { User } from "src/entity/user.entity";
import { AuthGuard } from "src/security/auth.guard";
import { TopStore } from "src/entity/topstore.entity";

@Controller('admin')
export class AdminController extends BaseController {

    constructor (
        private adminService: AdminService
    ) {
        super();
    }

    @Get('main')
    @Render('admin/admin.hbs')
    main() {}

    @Get('index')
    @Render('admin/admin.hbs')
    index() {}


    @Post('login')
    async login(@Body() user: User): Promise<RespData<IToken>> {
        const token: IToken = await this.adminService.login(user);
        return this.setBaseDto(token);
    }

    @Post('checkAuth')
    checkAuth(@Headers() headers): RespData<string> {
        if (!headers.authorization) {
            throw new UnauthorizedException('Unauthorized');
        }
        const token: string = headers.authorization.split('Bearer ')[1];
        this.adminService.verify(token);

        return this.setBaseDto('Authorized');
    }

    @UseGuards(AuthGuard)
    @Post('getUser')
    async getUser(@Body() user: User): Promise<RespData<User>> {
        const userInfo: User = await this.adminService.getUser(user);
        return this.setBaseDto(userInfo);
    }
    
    @Post('scrap')
    async scrap(@Body('drwNo') drwNo: number): Promise<RespData<TopStore[]>> {
        const stores: TopStore[] = await this.adminService.scrap(drwNo);
        return this.setBaseDto(stores);
    }

    @Post('topStores')
    async topStores(@Body('drwNo') drwNo: number): Promise<RespData<TopStore[]>> {
        const stores: TopStore[] = await this.adminService.selectTopStores(drwNo);
        return this.setBaseDto(stores);
    }
    
}