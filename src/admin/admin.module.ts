import { Module } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TopStore } from 'src/entity/topstore.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
          User,
          TopStore
      ])
  ],
  providers: [
      AdminService,
      JwtService
  ],
  controllers: [AdminController]
})
export class AdminModule {}