import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../..";
import BadRequestException from "../../common/exceptions/bad-request.exception";
import { compileValidationErrors } from "../../common/utils/error";
import { Author } from "../author/entities/author.entity";
import BookService from "./book.service";
import { CreateBookDto } from "./dtos/create.dto";
import { UpdateBookDto } from "./dtos/update.dto";
import AuthorRepository from "../author/repositories/author.repository";
import BookRepository from "./repositories/book.repository";

class BookController {
  constructor(private bookService: BookService) { }

  async getAll(_req: Request, res: Response) {
    const books = await this.bookService.getAll();
    return res.status(200).json(books);
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await this.bookService.getOne(Number(req.params.id));
      return res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

  async createOne(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new CreateBookDto(req.body);
      const validation = await validate(dto);
      if (validation.length > 0) throw new BadRequestException('Bad Request', compileValidationErrors(validation));

      const newBook = await this.bookService.createOne(dto);
      return res.status(200).json(newBook);
    } catch (error) {
      next(error);
    }
  }

  async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new UpdateBookDto(req.body);
      const validation = await validate(dto);
      if (validation.length > 0) throw new BadRequestException('Bad Request', compileValidationErrors(validation));

      const newBook = await this.bookService.updateOne(Number(req.params.id), dto);
      return res.status(200).json(newBook);
    } catch (error) {
      next(error);
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const newBook = await this.bookService.deleteOne(Number(req.params.id));
      return res.status(200).json(newBook);
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController(new BookService(BookRepository, AuthorRepository));