import { User } from '../../models/users.js';
import { HttpError } from '../../helpers/index.js';

export const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
   console.log('Verification Token from URL:', verificationToken);

    const user = await User.findOne({ verificationToken });
    if (!user) {
         throw HttpError(404, 'User not found');
    }
await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' });
console.log('User verification status updated successfully');


    res.json({
      message: 'Verification successful',
    });
}
