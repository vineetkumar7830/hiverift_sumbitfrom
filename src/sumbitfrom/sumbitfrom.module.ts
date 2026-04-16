import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubmitFromController } from './sumbitfrom.controller';
import { SubmitFromService } from './sumbitfrom.service';
import { SubmitFrom, SubmitFromSchema } from './entities/sumbitfrom.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubmitFrom.name, schema: SubmitFromSchema },
    ]),
  ],
  controllers: [SubmitFromController],
  providers: [SubmitFromService],
})
export class SubmitFromModule {}
