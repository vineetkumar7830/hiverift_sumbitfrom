import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SubmitFromService } from './sumbitfrom.service';
import { CreateSubmitFromDto } from './dto/create-sumbitfrom.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('submitfrom')
export class SubmitFromController {
  constructor(private readonly service: SubmitFromService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Body() dto: CreateSubmitFromDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(dto, file);
  }
}
