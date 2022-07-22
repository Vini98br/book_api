import { ConflictException } from "../../common/exceptions/conflict.exception";
import NotFoundException from "../../common/exceptions/not-found.exception";
import { CreateAuthorDto } from "./dtos/create.dto";
import { UpdateAuthorDto } from "./dtos/update.dto";
import { Author } from "./entities/author.entity";
import { AuthorRepositoryType } from "./repositories/author.repository";

export class AuthorService {
  constructor(private authorRepository: AuthorRepositoryType) { }

  async getAll() {
    return this.authorRepository.find({ relations: { books: true } });
  }

  async createOne(createAuthorDto: CreateAuthorDto) {
    const author = await this.authorRepository.findOne({ where: { firstName: createAuthorDto.firstName, lastName: createAuthorDto.lastName } });
    if (author) {
      throw new ConflictException('This author already exists in the Database');
    }

    const newAuthor = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(newAuthor);
  }

  async getOne(id: Author['id']) {
    const author = await this.authorRepository.findOne({ where: { id }, relations: { books: true } });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  async updateOne(id: Author['id'], updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    await this.authorRepository.update(id, { ...updateAuthorDto });
    return this.authorRepository.findOne({ where: { id }, relations: { books: true } });
  }

  async deleteOne(id: Author['id']) {
    const book = await this.authorRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Author not found');
    }
    return this.authorRepository.delete({ id });
  }
}