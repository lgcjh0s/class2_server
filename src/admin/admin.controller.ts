import { Controller } from "@nestjs/common";
import { BaseController } from "src/base/base.controller";
import { AdminService } from "./admin.service";

@Controller('admin')
export class AdminController extends BaseController {

    constructor (
        private adminService: AdminService
    ) {
        super();
    }
}