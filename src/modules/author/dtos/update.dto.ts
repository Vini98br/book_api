import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAuthorDto {
  constructor(data: UpdateAuthorDto) {
    Object.assign(this, data);
  }

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  birthDate: string;

  @IsString()
  @IsOptional()
  country: string;
}