import express, { Express, json, NextFunction, Request, Response, Router } from "express";
import cors from "cors";
import bookRouter from "./routes/book.router";
import authorRouter from "./routes/author.router";
import ExceptionFilter from "./common/exceptions/exception.filter";

class App {
  public express: Express;
  private exceptionFilter: ExceptionFilter;

  constructor() {
    this.express = express();
    this.exceptionFilter = new ExceptionFilter();
    this.applyMiddlewares();
    this.mountRoutes();
    this.applyErrorHandlers();
  }

  private applyMiddlewares() {
    this.express.use(json());
    this.express.use(cors({ origin: '*', methods: '*' }));
  }

  private applyErrorHandlers() {
    this.express.use((err: unknown, request: Request, response: Response, next: NextFunction) => {
      this.exceptionFilter.catch(err, { request, response, next })
    });
  }

  private mountRoutes() {
    const router = Router();
    router.get('/', (req, res) => {
      res.send('Server running!');
    });
    router.use(bookRouter);
    router.use(authorRouter);
    this.express.use(router);
  }
}

export default new App().express as Express;