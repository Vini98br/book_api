import { AppDataSource } from "../../..";
import { Book } from "../entities/book.entity";

const BookRepository = AppDataSource.getRepository(Book).extend({});

export type BookRepositoryType = typeof BookRepository;
export default BookRepository;