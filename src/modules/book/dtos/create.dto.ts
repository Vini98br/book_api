import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Author } from "../../author/entities/author.entity";

export class CreateBookDto {
  constructor(data: CreateBookDto) {
    Object.assign(this, data);
  }

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: Author['id'];

  @IsNumber()
  @IsNotEmpty()
  pages: number;

  @IsString()
  @IsNotEmpty()
  language: string;
}