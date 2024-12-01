// @ts-nocheck

import { User } from '../../models/users.js';
import logger from '../../helpers/logger.js';

export const updateUser = async (req, res) => {
  try {
    console.log('Starting updateUser with user data:', req.user);

    const { _id, name: currentUserName } = req.user;
    const { name } = req.body;
    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);

    if (!req.file) {
      console.log('No file uploaded, updating only user name.');
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { name: name || currentUserName },
        { new: true },
      ).catch((dbError) => {
        console.error('Database update error:', dbError);
        throw new Error('Database update failed');
      });
      if (!updatedUser) {
        console.error('User not found.');
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json({
        name: updatedUser.name,
        avatarURL: updatedUser.avatarURL,
      });
    }

    // Если файл загружен
   if (!req.file || !req.file.path) {
     console.error(
       'File not uploaded to Cloudinary or path missing:',
       req.file,
     );
     return res.status(400).json({ message: 'File upload failed' });
   }


    console.log('Updating user with new avatar URL:', req.file.path);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name: name || currentUserName, avatarURL: req.file.path },
      { new: true },
    );

    if (!updatedUser) {
      console.error('User not found.');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User successfully updated:', updatedUser);
    return res.json({
      name: updatedUser.name,
      avatarURL: updatedUser.avatarURL,
    });
  } catch (error) {
    console.error('Error in updateUser:', error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};
