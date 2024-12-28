import { User, schemas } from '../../models/users.js';
import { sendEmail, HttpError } from '../../helpers/index.js';
import dotenv from 'dotenv';

dotenv.config();
const { BASE_URL } = process.env;

export const subscribe = async (req, res) => {
  const response = schemas.emailSchema.validate(req.body, {
    abortEarly: false,
  });

  if (response.error) {
    throw HttpError(400, 'Please insert a valid email');
  }

  const { email: subscrEmail } = req.body;
  const { _id, email, name, subscribe } = req.user;

  if (subscrEmail !== email) {
    throw HttpError(400, 'Please insert your registration email');
  }

  if (subscribe === true) {
    throw HttpError(409, 'This email address is already subscribed');
  }

  const EmailAboutSubscription = {
    to: subscrEmail,
    subject: `Subscription message from ${BASE_URL}`,
    html: `
      <h1 style="font-size: 20px">Hello, ${name}!</h1>
      <p style="font-size: 16px">You are subscribed to our newsletters.</p>
      <p style="font-size: 16px">You will receive letters about our news and special offers, etc.</p>
      <p style="font-size: 16px">Thank you!</p>`,
  };

  await User.findByIdAndUpdate(_id, { subscribe: true });

  await sendEmail(EmailAboutSubscription);

  res.status(200).json({
    message: `Subscription successful. A confirmation email has been sent to ${subscrEmail}.`,
  });
};
