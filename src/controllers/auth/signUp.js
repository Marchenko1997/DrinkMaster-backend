import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

import { User } from '../../models/users.js';
import { HttpError, sendEmail, fullYearsCount } from '../../helpers/index.js';

// const { BASE_URL } = process.env;
const BASE_URL = 'https://drink-master-psi.vercel.app/';

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL =
      'https://res.cloudinary.com/dk6hnmt4s/image/upload/f_auto,q_auto/v1/avatar/xclhvbf8zl0rllwgrbck';

    const verificationToken = nanoid();

    const fullYears = await fullYearsCount(req.body.birthday);
    const isAdult = fullYears >= 18;

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
      isAdult,
    });

    const verifyEmail = {
      to: email,
      subject: 'Verify DrinkMaster',
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Verify DrinkMaster</title></head>
<body style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
  <h2 style="color: #333;">Verify your email</h2>
  <a href="${BASE_URL}user/${verificationToken}" style="background: #6366f1; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 500;">Confirm Email</a>
  <p style="font-size: 14px; color: #666; margin-top: 24px;">Or copy: ${BASE_URL}user/${verificationToken}</p>
  <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
  <p style="font-size: 12px; color: #999; margin: 0;">DrinkMaster &lt;noreply@drinkmaster.guru&gt;</p>
</body>
</html>`,
    };

    console.log(`Sending verification email to: ${email}`);
    await sendEmail(verifyEmail);

    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        avatarURL: newUser.avatarURL,
        birthday: newUser.birthday,
        isAdult: newUser.isAdult,
      },
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || 'Server error' });
  }
};
