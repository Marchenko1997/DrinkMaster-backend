// @ts-nocheck

import { User } from '../../models/users.js';
import logger from '../../helpers/logger.js';

export const updateUser = async (req, res) => {
  try {
    logger.info('Starting updateUser controller', { userId: req.user?._id });

    const { _id, name: currentUserName } = req.user;
    const { name } = req.body;

    logger.info('Request body and user data received', {
      userId: _id,
      name,
      currentUserName,
    });

    let newUserName = name || currentUserName;
    let newAvatarURL;

    // If no file is uploaded
    if (!req.file) {
      logger.info('No file provided, updating only name', { newUserName });

      const usr = await User.findByIdAndUpdate(
        _id,
        { name: newUserName },
        { new: true },
      );

      if (!usr) {
        logger.error('User not found during update', { userId: _id });
        return res.status(404).json({ message: 'User not found' });
      }

      logger.info('User updated successfully (name only)', {
        updatedUser: usr,
      });
      return res.json({ name: usr.name, avatarURL: usr.avatarURL });
    } else {
      // If file is uploaded
      newAvatarURL = req.file.path;
      logger.info('File provided, updating name and avatar', {
        newUserName,
        newAvatarURL,
      });

      const usr = await User.findByIdAndUpdate(
        _id,
        { name: newUserName, avatarURL: newAvatarURL },
        { new: true },
      );

      if (!usr) {
        logger.error('User not found during update with avatar', {
          userId: _id,
        });
        return res.status(404).json({ message: 'User not found' });
      }

      logger.info('User updated successfully (name and avatar)', {
        updatedUser: usr,
      });
      return res.json({ name: usr.name, avatarURL: usr.avatarURL });
    }
  } catch (error) {
    logger.error('Error in updateUser controller', { error: error.message });
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};
