import { validate } from "class-validator";
import { ConflictException } from "../../common/exceptions/conflict.exception";
import NotFoundException from "../../common/exceptions/not-found.exception";
import { AuthorRepositoryType } from "../author/repositories/author.repository";
import { CreateBookDto } from "./dtos/create.dto";
import { UpdateBookDto } from "./dtos/update.dto";
import { Book } from "./entities/book.entity";
import { BookRepositoryType } from "./repositories/book.repository";

class BookService {
  constructor(private bookRepository: BookRepositoryType, private authorRepository: AuthorRepositoryType) { }

  async getAll() {
    return this.bookRepository.find({ relations: { author: true } });
  }

  async createOne(createBookDto: CreateBookDto) {
    const author = await this.authorRepository.findOne({ where: { id: createBookDto.authorId } });
    if (!author) {
      throw new NotFoundException('The author informed does not exists');
    }

    const book = await this.bookRepository.findOne({ where: { title: createBookDto.title } });
    if (book) {
      throw new ConflictException('This book name already exists in the Database')
    }

    const newBook = this.bookRepository.create({ ...createBookDto });
    return { ...await this.bookRepository.save(newBook), author };
  }

  async getOne(id: Book['id']) {
    const book = await this.bookRepository.findOne({ where: { id }, relations: { author: true } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateOne(id: Book['id'], updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    let author;
    if (updateBookDto.authorId) {
      author = await this.authorRepository.findOne({ where: { id: updateBookDto.authorId } });
      if (!author) {
        throw new NotFoundException('The author informed does not exists');
      }
    }
    await this.bookRepository.update(id, { ...updateBookDto, authorId: updateBookDto.authorId ? updateBookDto.authorId : book.authorId });
    return this.bookRepository.findOne({ where: { id } });
  }

  async deleteOne(id: Book['id']) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return this.bookRepository.delete({ id });
  }
}

export default BookService;