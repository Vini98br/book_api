import { Router } from 'express';
import BookController from '../modules/book/book.controller';
const bookRouter = Router();

bookRouter.route('/book')
  .get(BookController.getAll.bind(BookController))
  .post(BookController.createOne.bind(BookController));

bookRouter.route('/book/:id')
  .get(BookController.getOne.bind(BookController))
  .patch(BookController.updateOne.bind(BookController))
  .delete(BookController.deleteOne.bind(BookController));

export default bookRouter;