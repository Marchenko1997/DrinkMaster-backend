import { User } from "../../models/users.js";
import { HttpError, sendEmail } from '../../helpers/index.js';
import dotenv from 'dotenv';

dotenv.config();

const { BASE_URL } = process.env;

export const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, "User not found");
    }

    if (user.verify) {
        throw HttpError(409, "Verification has already been passed");
    }

    const verifyEmail = {
      to: email,
      subject: 'Verify email',
      html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({
      message: 'Verification email sent',
    });

}

