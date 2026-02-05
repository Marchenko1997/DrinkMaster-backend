import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (data) => {
  const { to, subject, html } = data;
  try {
    await resend.emails.send({
      from: 'DrinkMaster <onboarding@resend.dev>', // Resend free from
      to,
      subject,
      html,
    });
    console.log(`Email sent to: ${to}`);
    return true;
  } catch (error) {
    console.error('Resend error:', error.message);
    throw new Error('Email send failed');
  }
};

export default sendEmail;
