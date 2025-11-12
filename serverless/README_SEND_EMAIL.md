How to receive Contact form messages via email

Two recommended approaches (pick one):

1) Quick / No backend: Formspree
   - Good when you don't want to manage servers.
   - Go to https://formspree.io, create a form and copy the endpoint.
   - Update the form in `src/pages/Contact.tsx` to POST to that endpoint (or use the `action` attribute).

2) Recommended: Use a serverless function (SendGrid) — example provided
   - I added `api/send-contact.ts` which is a Vercel serverless function example that uses SendGrid.
   - What you need:
     - A SendGrid account and an API key (SENDGRID_API_KEY).
     - A verified sender identity in SendGrid (FROM_EMAIL).
     - Set TO_EMAIL to the email that should receive messages (e.g., cyberdhators@gmail.com).

   - Environment variables (set these in Vercel/Netlify/Azure):
     - SENDGRID_API_KEY (required)
     - FROM_EMAIL (recommended; must be verified in SendGrid)
     - TO_EMAIL (optional; defaults to cyberdhators@gmail.com)

   - Deploying on Vercel:
     1. Push changes to your repo.
     2. On Vercel, create a new project pointing to this repo.
     3. Under Project Settings -> Environment Variables, add the keys above.
     4. The function will be available at `https://<your-vercel-app>/api/send-contact`.

   - Local testing:
     - For local development you can run Vercel dev or run a small express server that proxies to this function.
     - Make sure to set the environment variables locally (e.g., using a `.env` file) and follow your platform's local dev docs.

Notes and security
- Never expose your SendGrid key in client-side code. The serverless function keeps it secret.
- Validate inputs and consider adding rate-limiting / reCAPTCHA if your site is public to prevent abuse.
- Alternatively, you can use Nodemailer with an SMTP account (Gmail/SES) inside the same function; SendGrid is simpler for production.

If you want, I can:
- Add a Netlify function equivalent.
- Wire the project to deploy on Vercel for you (create `vercel.json`, etc.).
- Implement serverless function using Nodemailer + SMTP instead of SendGrid.
