import { sendMail } from '../../lib/api';

export default async function contact(req, res) {
  const { body, method } = req;
  const {
    name, email, subject, message, recaptcha,
  } = body;

  if (method === 'POST') {
    /* If fields or captcha are missing return an error */
    if (!name || !email || !subject || !message || !recaptcha) {
      return res.status(422).json({
        message: 'Unproccesable request, please provide the required fields.',
      });
    }

    try {
      /* Ping the google recaptcha API to verify the recaptcha code */
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          },
          method: 'POST',
        },
      );
      const captchaValidation = await response.json();
      /**
       * The structure of response from the veirfy API is
       * {
       *  "success": true|false,
       *  "challenge_ts": timestamp,
       *  "hostname": string,
       *  "error-codes": [...]
        }
       */
      if (captchaValidation.success) {
        /* user verified, create email template with submitted details */
        const emailContent = `
          From: ${name} ${email}.
          Subject: ${subject}.
          Message:
          ${message}
        `;

        /* send submitted data to server */
        const data = await sendMail(
          'New message from website contact form',
          emailContent,
        );

        /* check whether data was submitted successfully */
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

      /* Invalid recaptcha, return error */
      return res.status(422).json({
        message: 'Unproccesable request - invalid captcha code.',
      });
    } catch (error) {
      return res.status(422).json({
        message: 'Oops, something went wrong with the request.',
        error,
      });
    }
  }
  /* Return 404 if someone pings the API with a method other than POST */
  return res.status(404).send('Not found');
}
