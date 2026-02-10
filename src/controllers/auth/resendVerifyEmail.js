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
      subject: 'Verify DrinkMaster',
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Verify DrinkMaster</title></head>
<body style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
  <h2 style="color: #333;">Verify your email</h2>
  <a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" style="background: #6366f1; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 500;">Confirm Email</a>
  <p style="font-size: 14px; color: #666; margin-top: 24px;">Or copy: ${BASE_URL}/api/auth/verify/${user.verificationToken}</p>
  <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
  <p style="font-size: 12px; color: #999; margin: 0;">DrinkMaster &lt;noreply@drinkmaster.guru&gt;</p>
</body>
</html>`,
    };

    await sendEmail(verifyEmail);

    res.json({
      message: 'Verification email sent',
    });

}

