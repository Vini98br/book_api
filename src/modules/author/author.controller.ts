import { AuthorService } from "./author.service";
import { NextFunction, Request, Response } from "express";
import { CreateAuthorDto } from "./dtos/create.dto";
import AuthorRepository from "./repositories/author.repository";
import { validate } from "class-validator";
import BadRequestException from "../../common/exceptions/bad-request.exception";
import { compileValidationErrors } from "../../common/utils/error";
import { UpdateAuthorDto } from "./dtos/update.dto";

class AuthorController {
  constructor(private authorService: AuthorService) { }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const authors = await this.authorService.getAll();
      return res.status(200).json(authors);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const author = await this.authorService.getOne(Number(req.params.id));
      return res.status(200).json(author);
    } catch (error) {
      next(error);
    }
  }

  async createOne(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new CreateAuthorDto(req.body);
      const validation = await validate(dto);
      if (validation.length > 0) throw new BadRequestException('Bad Request', compileValidationErrors(validation));

      const newAuthor = await this.authorService.createOne(dto);
      return res.status(200).json(newAuthor);
    } catch (error) {
      next(error);
    }
  }

  async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new UpdateAuthorDto(req.body);
      const validation = await validate(dto);
      if (validation.length > 0) throw new BadRequestException('Bad Request', compileValidationErrors(validation));

      const updatedAuthor = await this.authorService.updateOne(Number(req.params.id), dto);
      return res.status(200).json(updatedAuthor);
    } catch (error) {
      next(error);
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.authorService.deleteOne(Number(req.params.id));
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthorController(new AuthorService(AuthorRepository));