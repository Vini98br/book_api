import { AppDataSource } from "../../..";
import { Author } from "../entities/author.entity";

const AuthorRepository = AppDataSource.getRepository(Author).extend({});

export type AuthorRepositoryType = typeof AuthorRepository;
export default AuthorRepository;