import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {
  constructor(data: CreateAuthorDto) {
    Object.assign(this, data);
  }

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}