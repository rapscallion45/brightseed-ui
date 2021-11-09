import { sendMail } from '../../lib/api';

export default async function contact(req, res) {
  const {
    name, email, subject, message,
  } = req.body;

  /* create email template with submitted details */
  const emailContent = `
          From: ${name} ${email}.
          Subject: ${subject}.
          Message:
          ${message}

          This message was generated on the brightseed.io website.
        `;

  /* send submitted data to server */
  const data = await sendMail(
    'New message from website contact form',
    emailContent,
  );

  if (data) {
    return res.status(200).json({
      message:
        'Thank you, your contact form was submitted successfully. We will aim to get back to you within 24 hours.',
    });
  }
  return res.status(400).json({
    message:
      'There was an error submitting your form. Please try again, or send us an email at: contact@brightseed.io',
  });
}
