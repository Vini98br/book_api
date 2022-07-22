import { HttpException } from "./http-exception.exception";

export default class NotFoundException extends HttpException {
  constructor(message: string) {
    super({ message, code: 404 });
  }
}