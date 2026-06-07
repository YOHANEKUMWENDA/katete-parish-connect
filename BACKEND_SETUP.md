# St. Thereza Catholic Church Backend Integration Setup Guide

This document explains how to configure the backend and third-party services used by the St. Thereza Catholic Church website.

## Contact & Prayer Forms (Formspree)

### Steps
1. Go to https://formspree.io and sign up.
2. Create two new forms:
   - Contact Form
   - Prayer Requests
3. Copy each generated Form ID (e.g. `f/abc123def456`).
4. Update the route files:
   - `src/routes/contact.tsx` → replace the contact form action with your Contact Form ID.
   - `src/routes/prayer.tsx` → replace the prayer form action with your Prayer Requests Form ID.

### Notes
- Formspree sends submissions to your email.
- It requires no custom backend.
- The free tier includes a limited number of monthly submissions.

---

## Donations (Stripe)

### Steps
1. Go to https://stripe.com and create an account.
2. Complete Stripe identity verification.
3. Get your API keys from Dashboard > Developers > API keys:
   - `Publishable key` (starts with `pk_test_` or `pk_live_`)
   - `Secret key` (starts with `sk_test_` or `sk_live_`)
4. Add keys to `.env.local`:
   ```env
   STRIPE_SECRET_KEY=sk_test_xxxxx
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   VITE_BASE_URL=http://localhost:5173
   ```
5. For production, replace `test` keys with `live` keys and set the correct `VITE_BASE_URL`.

### Integration
- Frontend donation form: `src/components/DonationForm.tsx`
- Stripe helper: `src/lib/api/stripe.functions.ts`
- `VITE_BASE_URL` is used for checkout success/cancel URLs.

---

## Newsletter (Mailchimp)

### Steps
1. Go to https://mailchimp.com and create an account.
2. Create a new audience.
3. Open Audience > Signup forms > Embedded forms.
4. Copy the action URL and hidden field names from the embedded form code.
5. Update `src/components/MailchimpNewsletter.tsx`:
   - Set the `form` `action` to the Mailchimp embed URL.
   - Set the honeypot hidden input `name` value to the Mailchimp `b_..._...` field.

### Notes
- The newsletter form is styled inside the site and submits directly to Mailchimp.
- The user experience does not require a backend service.

---

## News & Blog (Sanity)

### Steps
1. Create a Sanity project:
   ```bash
   npm create sanity@latest -- --project-name st-thereza-parish --dataset production
   cd sanity-studio
   npm install
   npm run dev
   ```
2. Add a blog schema in `schemas/post.js`.
3. Get `projectId` and `dataset` from Sanity settings.
4. Add to `.env.local`:
   ```env
   VITE_SANITY_PROJECT_ID=your_project_id
   VITE_SANITY_DATASET=production
   ```
5. Add blog posts in Sanity Studio.

### Frontend
- News page: `src/routes/news.tsx`
- Optional blog feed component: create `src/components/BlogPostsFeed.tsx` if you want a reusable feed component.

---

## Events (Google Forms)

### Steps
1. Go to https://forms.google.com and create a new form.
2. Click Send > Embed and copy the iframe code.
3. Paste the iframe embed code into the event registration route or a dedicated page/component.

### Example
```html
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeBe9Ia1favbmWg-S9w0ptAqHFh0PQgF4RQwcGNEwNOKkk-fw/viewform?embedded=true" width="640" height="1547" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
```

### Notes
- Google Forms handles submissions and stores them in a spreadsheet.
- This is a backend-free event registration option.

---

## Environment Variables

Create a `.env.local` file at the project root:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
VITE_BASE_URL=http://localhost:5173

# Sanity
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

Do not commit `.env.local` to git.

---

## Deployment

- Update the `VITE_BASE_URL` for production.
- Replace Stripe keys with live keys.
- Ensure Formspree and Mailchimp IDs are the final production values.
- If using GitHub Pages or a static host, configure SPA fallback so route refreshes do not return 404.

---

## What changed

- The newsletter form is now visible on the home page.
- There is a new backend setup document in `BACKEND_SETUP.md`.
- Existing third-party endpoints are wired directly in the UI components.
