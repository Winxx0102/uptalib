import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  routepdf: string; // O IsUrl() si es un link

  @IsOptional()
  @IsString()
  routeimg?: string;
}