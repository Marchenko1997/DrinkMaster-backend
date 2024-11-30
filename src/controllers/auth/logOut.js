import { User } from '../../models/users.js';

export const logOut = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, { token: '' });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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
