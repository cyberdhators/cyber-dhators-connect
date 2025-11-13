0import type { VercelRequest, VercelResponse } from '@vercel/node';
import sgMail from '@sendgrid/mail';

// NOTE: This file is a Vercel serverless function example.
// Replace with your preferred hosting (Vercel/Netlify/Azure) and set env vars
// - SENDGRID_API_KEY: your SendGrid API key
// - TO_EMAIL: the address that should receive contact messages (e.g., cyberdhators@gmail.com)
// - FROM_EMAIL: a verified sender in SendGrid (e.g., noreply@yourdomain.com)

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const to = process.env.TO_EMAIL || 'cyberdhators@gmail.com';
    const from = process.env.FROM_EMAIL || 'noreply@yourdomain.com';

    const msg = {
      to,
      from,
      subject: `[Contact Form] ${subject || 'New message from website'}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`
    };

    await sgMail.send(msg as any);

    res.status(200).json({ message: 'Email sent' });
  } catch (error: any) {
    console.error('send-contact error', error);
    res.status(500).json({ message: error?.message || 'Server error' });
  }
}
