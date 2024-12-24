import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/index.js';

export const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
     console.error(`${id} is not a valid MongoDB ObjectId`);
    next(HttpError(404, `${id} is not valid id`));
  }
  next();
};
   