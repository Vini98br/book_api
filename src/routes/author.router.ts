import { Router } from 'express';
import AuthorController from '../modules/author/author.controller';
const authorRouter = Router();

authorRouter.route('/author')
  .get(AuthorController.getAll.bind(AuthorController))
  .post(AuthorController.createOne.bind(AuthorController));

authorRouter.route('/author/:id')
  .get(AuthorController.getOne.bind(AuthorController))
  .patch(AuthorController.updateOne.bind(AuthorController))
  .delete(AuthorController.deleteOne.bind(AuthorController));

export default authorRouter;