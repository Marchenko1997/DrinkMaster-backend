import { User } from '../../models/users.js';

export const logOut = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found before update' });
    }

    const updatedUser = await User.findByIdAndUpdate(_id, { token: '' });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found after update' });
    }

    res.status(204).json({ message: 'Logout success' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
};
