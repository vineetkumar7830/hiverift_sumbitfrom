import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from './config/mongo.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SubmitFromModule } from './sumbitfrom/sumbitfrom.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRootAsync(mongoConfig),
    SubmitFromModule,
  

  ],
})
export class AppModule {}
