export class Http {

    constructor (
        private readonly charset: string
    ) {}

    public static EUCKR: string = 'EUC-KR';
    public static UTF8: string = 'UTF-8';

    private request = require('request');
    private iconv = require('iconv-lite');

    async doPost(url: string, params: object = null): Promise<string> {

        return new Promise((resolve, reject) => {
            this.request.post({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: url,
                encoding: null,
                body: {},
                form: params,
                json: true
            }, (error: object, response: object, body: object) => {
                if (body) {
                    const html: string = this.iconv.decode(body, this.charset);
                    resolve(html);
                } else {
                    reject(error);
                }
            })
        });
    }
}
