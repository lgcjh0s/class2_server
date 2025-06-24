import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { User } from './entity/user.entity';
import { AdminModule } from './admin/admin.module';
import { TopStore } from './entity/topstore.entity';
import { ClientModule } from './client/client.module';


@Module({
  imports: [
    AdminModule,
    ClientModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'testuser',
      password: 'test01!',
      database: 'testDB',
      entities: [
        User,
        TopStore
      ],
      synchronize: false,
      logging: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'service')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
