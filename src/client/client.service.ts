import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { TopStore } from "src/entity/topstore.entity";
import { Repository } from "typeorm";

export class ClientService extends BaseService {

    constructor (
        @InjectRepository(TopStore)
        private topStoreRepository: Repository<TopStore>
    ) {
        super();
    }
}