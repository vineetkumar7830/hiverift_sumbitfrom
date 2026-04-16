import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateSubmitFromDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  serviceInterestedIn?: string;

  @IsString()
  projectDetails: string;
}
