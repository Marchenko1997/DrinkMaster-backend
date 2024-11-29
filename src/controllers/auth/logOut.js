import { User } from '../../models/users.js';

export const logOut = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.status(204).json({
      message: 'Logout success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Logout failed',
      error: error.message,
    });
  }
};
