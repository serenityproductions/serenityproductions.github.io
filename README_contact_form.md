# Contact Form — Setup Instructions

This is a simple contact form that works on GitHub Pages (static site) by posting to a third-party form service which then emails you.

Files added:
- contact.html — the contact page with the form
- assets/contact.js — client-side handler that POSTs the form as JSON

How it works:
- Because GitHub Pages is static, the site cannot send mail directly. The form needs to post to a form handling service such as:
  - Formspree (https://formspree.io) — recommended
  - Formsubmit (https://formsubmit.co) — no signup required, but less features
  - Getform, Netlify Forms, GetResponse, or EmailJS (client-side SMTP via a provider)

Quick setup (Formspree — recommended)
1. Sign up at https://formspree.io and create a new form (you'll be given an endpoint like `https://formspree.io/f/abcd1234`).
2. Open `contact.html` and replace both the form `action` and the `data-endpoint` attribute with your Formspree endpoint:
   - action="https://formspree.io/f/abcd1234"
   - data-endpoint="https://formspree.io/f/abcd1234"
3. Optionally uncomment and set the hidden `_subject` input in the form if you want a fixed subject line.
4. Commit and push to your `serenityproductions.github.io` repo. Visit `https://serenityproductions.github.io/contact.html` and test the form.
5. Formspree will email you when someone submits. Check Formspree settings if you want autoresponders, redirect, or spam protection.

Alternative: FormSubmit (no signup)
- Replace the `action` attribute with:
  `https://formsubmit.co/youremail@example.com`
- Remove `data-endpoint` or set it the same. FormSubmit expects a classic form POST (URL-encoded). If you use the JS that posts JSON, FormSubmit may not accept the request — instead remove or bypass the JS so the regular HTML POST happens (or modify the JS to send URLSearchParams).
- See FormSubmit docs for verification steps.

Spam & security
- A hidden honeypot `_gotcha` is included to reduce bot submissions.
- For stronger protection, enable reCAPTCHA via your chosen service (Formspree supports CAPTCHA).
- Never hard-code SMTP credentials client-side.

If you'd like, I can:
- Add Formspree-specific hidden inputs (redirect URL, _subject) and an example endpoint filled in.
- Switch the JS to send URL-encoded form data for compatibility with FormSubmit.
- Add serverless/send-email example (AWS Lambda, Vercel, Netlify Functions) if you want full control without a third-party form processor.

Tell me which provider you'd like to use (Formspree, FormSubmit, EmailJS, or serverless) and I will update the form and code accordingly.
