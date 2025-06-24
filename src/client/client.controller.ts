import { Controller } from "@nestjs/common";
import { BaseController } from "src/base/base.controller";
import { ClientService } from "./client.service";

@Controller('client')
export class ClientController extends BaseController {

    constructor (
        private readonly clientService: ClientService
    ) {
        super();
    }
}