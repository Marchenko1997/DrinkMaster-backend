import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (data) => {
  const { to, subject, html } = data;

 
  console.log('🔑 API:', process.env.RESEND_API_KEY ? 'OK' : '❌ MISSING');
  console.log('📧 TO:', to);

  try {
    const { data: result, error } = await resend.emails.send({
      from: 'DrinkMaster <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

 
    console.log('📤 RESULT:', result?.id || error?.message);

    if (error) throw error; 

    console.log(`✅ Email sent to: ${to}`);
    return true;
  } catch (error) {
    console.error('❌ FULL ERROR:', error);
    throw new Error('Email send failed');
  }
};

export default sendEmail;
