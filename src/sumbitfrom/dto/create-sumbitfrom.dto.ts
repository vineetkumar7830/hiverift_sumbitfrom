import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateSubmitFromDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  portfolio?: string;

  @IsString()
  coverLetter: string;
}
