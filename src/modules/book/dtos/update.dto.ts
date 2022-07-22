import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Author } from "../../author/entities/author.entity";

export class UpdateBookDto {
  constructor(data: UpdateBookDto) {
    Object.assign(this, data);
  }

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  isbn: string;

  @IsString()
  @IsOptional()
  authorId: Author['id'];

  @IsNumber()
  @IsOptional()
  pages: number;

  @IsString()
  @IsOptional()
  language: string;
}