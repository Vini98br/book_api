import { HttpException } from "./http-exception.exception";

export class ConflictException extends HttpException {
  constructor(message: string) {
    super({ message, code: 409 });
  }
}