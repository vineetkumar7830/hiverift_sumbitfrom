import { Body, Controller, Post } from '@nestjs/common';
import { SubmitFromService } from './sumbitfrom.service';
import { CreateSubmitFromDto } from './dto/create-sumbitfrom.dto';

@Controller('submitfrom')
export class SubmitFromController {
  constructor(private readonly service: SubmitFromService) {}

  @Post()
  create(@Body() dto: CreateSubmitFromDto) {
    return this.service.create(dto);
  }
}
