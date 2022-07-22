import { NextFunction, Request, Response } from "express";
import { Field, HttpException } from "./http-exception.exception";

type Context = { request: Request; response: Response; next: NextFunction };
type ErrorResponse = {
  message: string;
  statusCode: number;
  fields?: Field[];
}
export default class ExceptionFilter {
  catch(error: unknown, context: Context) {
    console.error('[ERROR] ', error);
    let response: ErrorResponse = {
      message: 'An unexpected error occoured',
      statusCode: 500,
    };

    if (error instanceof HttpException) {
      response.message = error.message;
      response.statusCode = error.code;
      if (error.fields) {
        response.fields = error.fields;
      }
    }

    context.response.status(response.statusCode).json(response);
  }
} 