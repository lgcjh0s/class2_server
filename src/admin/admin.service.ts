import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/base/base.service";
import { TopStore } from "src/entity/topstore.entity";
import { User } from "src/entity/user.entity";
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
}