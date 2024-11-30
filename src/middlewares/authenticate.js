import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';
import { HttpError } from '../helpers/index.js';
import logger from '../helpers/logger.js';

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  if (!authorization) {
    logger.error('Authorization header missing');
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    logger.error('Not authorized, Bearer token missing');
    return res
      .status(401)
      .json({ message: 'Not authorized, Bearer token missing' });
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    logger.info('Token decoded successfully', { id });

    const user = await User.findById(id);

    if (!user || user.token !== token) {
      logger.error('User not found or token mismatch', { id, token });
      return res
        .status(401)
        .json({ message: 'Not authorized, user not found or token mismatch' });
    }

    logger.info('Authentication successful', { userId: id });
    req.user = user;

    next();
  } catch (error) {
    logger.error('Authentication failed', { error: error.message });
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};
