import { PartialType } from '@nestjs/mapped-types';
import {CreateSubmitFromDto } from './create-sumbitfrom.dto';

export class UpdateSumbitfromDto extends PartialType(CreateSubmitFromDto) {}
