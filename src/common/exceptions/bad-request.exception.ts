import { HttpException } from "./http-exception.exception";

export default class BadRequestException extends HttpException {
  constructor(message: string, fields?: any[]) {
    super({ message, code: 400, fields });
  }
}