import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../../models/users.js';
import { HttpError } from '../../helpers/index.js';

import 'dotenv/config';
const { SECRET_KEY } = process.env;

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const passwordCompare = await bcrypt.compare(password, user?.password);

  if (!user || !passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  if (!user.verify) {
    throw HttpError(403, 'Email not verified');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      birthday: user.birthday,
      isAdult: user.isAdult,
    },
  });
};
