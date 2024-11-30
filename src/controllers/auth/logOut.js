import { User } from '../../models/users.js';


export const logOut = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.status(204).json({ message: 'Logout success' });
  } catch (error) {
    next(error);
  }
};
