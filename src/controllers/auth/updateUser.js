// @ts-nocheck

import { User } from '../../models/users.js';

export const updateUser = async (req, res) => {
  try {
    const { _id, name: currentUserName } = req.user;
    const { name } = req.body;

    if (!req.file) {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { name: name || currentUserName },
        { new: true },
      ).catch(() => {
        throw new Error('Database update failed');
      });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({
        name: updatedUser.name,
        avatarURL: updatedUser.avatarURL,
      });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'File upload failed' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name: name || currentUserName, avatarURL: req.file.path },
      { new: true },
    ).catch(() => {
      throw new Error('Database update failed');
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      name: updatedUser.name,
      avatarURL: updatedUser.avatarURL,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};
