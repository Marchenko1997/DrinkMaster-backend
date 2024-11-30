import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';
import { HttpError } from '../helpers/index.js';

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }


  const [bearer, token] = authorization.split(' ');

 if (bearer !== 'Bearer') {
   return res
     .status(401)
     .json({ message: 'Not authorized, Bearer token missing' });
 }

try {
  const { id } = jwt.verify(token, SECRET_KEY);

  const user = await User.findById(id);

  if (!user || user.token !== token) {
    return res
      .status(401)
      .json({ message: 'Not authorized, user not found or token mismatch' });
  }

  req.user = user;

  next();
} catch  {
  return res.status(401).json({ message: 'Not authorized, invalid token' });
}
};
