import { User } from '../../models/users.js';
import logger from '../../helpers/logger.js';

export const logOut = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);

    if (!user) {
      logger.error('User not found before update', { userId: _id });
      return res.status(404).json({ message: 'User not found before update' });
    }

    const updatedUser = await User.findByIdAndUpdate(_id, { token: '' });
    if (!updatedUser) {
      logger.error('User not found after update', { userId: _id });
      return res.status(404).json({ message: 'User not found after update' });
    }
    logger.info('Logout successful', { userId: _id });
    res.status(204).json({ message: 'Logout success' });
  } catch (error) {
       logger.error('Logout failed', { error: error.message });
    res.status(500).json({ message: 'Logout failed', error: error.message });
  }
};
