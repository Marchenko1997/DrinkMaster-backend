import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

import { User } from '../../models/users.js';
import { HttpError, sendEmail, fullYearsCount } from '../../helpers/index.js';

// const { BASE_URL } = process.env;
const BASE_URL = 'http://localhost:5173/drink-code-frontend';

export const signUp = async (req, res) => {
  try {
    console.log('Incoming request body:', req.body); // Лог входящих данных

    const { email, password } = req.body;

    // Проверяем, существует ли пользователь с таким email
    console.log(`Checking if user exists with email: ${email}`);
    const user = await User.findOne({ email });

    if (user) {
      console.log(`User with email ${email} already exists`); // Лог существующего пользователя
      throw HttpError(409, 'Email in use');
    }

    // Хэшируем пароль
    console.log(`Hashing password for email: ${email}`);
    const hashPassword = await bcrypt.hash(password, 10);

    // Устанавливаем URL аватара
    const avatarURL =
      'https://res.cloudinary.com/dk6hnmt4s/image/upload/f_auto,q_auto/v1/avatar/xclhvbf8zl0rllwgrbck';

    // Генерируем verificationToken
    const verificationToken = nanoid();
    console.log(
      `Generated verification token: ${verificationToken} for email: ${email}`,
    );

    // Проверяем возраст пользователя
    console.log(`Calculating full years for birthday: ${req.body.birthday}`);
    const fullYears = await fullYearsCount(req.body.birthday);
    const isAdult = fullYears >= 18;
    console.log(`User is adult: ${isAdult}`);

    // Создаем нового пользователя
    console.log('Creating new user in database...');
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
      isAdult,
    });
    console.log('New user created successfully:', newUser);

    // Отправляем письмо для подтверждения
    const verifyEmail = {
      to: email,
      subject: 'Verify email',
      html: `<a target="_blank" href="${BASE_URL}user/${verificationToken}">Click verify email</a>`,
    };
    console.log(`Sending verification email to: ${email}`);
    await sendEmail(verifyEmail);

    // Возвращаем успешный ответ
    console.log('User signed up successfully');
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
    console.error('Error during sign up:', error); // Лог ошибки
    res
      .status(error.status || 500)
      .json({ message: error.message || 'Server error' });
  }
};
