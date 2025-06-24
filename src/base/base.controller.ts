import { Logger } from "../common/common.logger";
import { RespData } from "./base.entity";

export class BaseController {

    logger = new Logger();

    setBaseDto(data: any): RespData<any> {
        const respData: RespData<any> = {
            data: data,
            statusCode: 200,
            message: 'Success'
        };
        return respData;
    }
}