import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TopStore } from "src/entity/topstore.entity";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TopStore
        ])
    ],
    providers: [ClientService],
    controllers: [ClientController]
})
export class ClientModule {}