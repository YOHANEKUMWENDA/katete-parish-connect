# Backend Integration Setup Guide

This document provides step-by-step instructions for setting up all backend services for Katete Parish Connect.

## Table of Contents
1. [Contact & Prayer Forms (Formspree)](#formspree-setup)
2. [Donations (Stripe)](#stripe-setup)
3. [Newsletter (Mailchimp)](#mailchimp-setup)
4. [News & Blog (Sanity CMS)](#sanity-cms-setup)
5. [Events (Google Forms)](#google-forms-setup)
6. [Environment Variables](#environment-variables)

---

## Formspree Setup

**Contact Form & Prayer Request Form**

### Steps:
1. Go to [formspree.io](https://formspree.io) and sign up
2. Click "New Form" and create two forms:
   - **Form 1:** "Contact Form" 
   - **Form 2:** "Prayer Requests"
3. For each form, you'll get a unique Form ID (e.g., `f/abc123def456`)
4. Update your code:
   - **Contact form:** Replace `YOUR_FORM_ID` in [src/routes/contact.tsx](src/routes/contact.tsx) with your Formspree Form ID
   - **Prayer form:** Replace `YOUR_PRAYER_FORM_ID` in [src/routes/prayer.tsx](src/routes/prayer.tsx) with your Formspree Form ID

### Features:
- ✅ Emails received directly to your inbox
- ✅ Spam protection included
- ✅ Free tier: 50 submissions/month
- ✅ No backend coding needed

---

## Stripe Setup

**Online Donations**

### Steps:
1. Go to [stripe.com](https://stripe.com) and create a business account
2. Complete identity verification (required for live payments)
3. Get your API keys from Dashboard > Settings > API Keys:
   - **Publishable Key** (starts with `pk_live_` or `pk_test_`)
   - **Secret Key** (starts with `sk_live_` or `sk_test_`)

4. Add to your `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_xxxxx
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   VITE_BASE_URL=http://localhost:5173
   ```

5. For production, replace `test` keys with `live` keys

### Test Cards:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Any 3-digit CVC**, any future expiry date

### Integration:
- Donation form is already integrated: [src/components/DonationForm.tsx](src/components/DonationForm.tsx)
- Backend API: [src/lib/api/stripe.functions.ts](src/lib/api/stripe.functions.ts)
- You may need to create a server endpoint to handle the checkout session creation

### Features:
- ✅ Multiple payment methods (card, digital wallets)
- ✅ Built for nonprofits (lower fees)
- ✅ PCI compliant
- ✅ Secure and trusted

---

## Mailchimp Setup

**Newsletter Subscription**

### Steps:
1. Go to [mailchimp.com](https://mailchimp.com) and create a free account
2. Create a new audience (formerly called list):
   - Name: "Katete Parish Connect"
   - Email address: your parish email
3. From **Audience** menu, click **Signup Forms** → **Embedded Forms**
4. Copy the **Form Action URL** (looks like: `https://katetecatholic.us20.list-manage.com/subscribe/post?u=...`)
5. Extract these values:
   - `u=` value → your **LIST_ID**
   - `id=` value → your **FORM_ID**

6. Update [src/components/MailchimpNewsletter.tsx](src/components/MailchimpNewsletter.tsx):
   - Line 26: Replace `YOUR_LIST_ID` with your LIST_ID
   - Line 26: Replace `YOUR_FORM_ID` with your FORM_ID
   - Line 41: Replace `YOUR_LIST_ID_YOUR_FORM_ID` with combined value

### Features:
- ✅ Free tier: up to 500 contacts
- ✅ Professional email templates
- ✅ Subscriber management dashboard
- ✅ Already embedded on home page

---

## Sanity CMS Setup

**Editable News & Blog Posts**

### Steps:

#### 1. Create a Sanity Project:
```bash
npm create sanity@latest -- --project-name katete-parish --dataset production
cd sanity-studio
npm install
npm run dev
```

#### 2. Create Content Schema:
In your Sanity project, create `schemas/post.js`:

```javascript
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Announcement', value: 'Announcement' },
          { title: 'Mission', value: 'Mission' },
          { title: 'Youth', value: 'Youth' },
          { title: 'Liturgy', value: 'Liturgy' },
        ],
      },
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],
};
```

#### 3. Get Your Credentials:
- Go to your Sanity project settings
- Find **Project ID** and **Dataset** name
- Add to `.env.local`:
  ```
  VITE_SANITY_PROJECT_ID=xxxxx
  VITE_SANITY_DATASET=production
  ```

#### 4. Create Blog Posts:
- Open Sanity Studio at `http://localhost:3333`
- Click **"Blog Post"** in the sidebar
- Create your first post!

#### 5. The Frontend is Ready:
- News page automatically fetches from Sanity: [src/routes/news.tsx](src/routes/news.tsx)
- Blog feed component: [src/components/BlogPostsFeed.tsx](src/components/BlogPostsFeed.tsx)

### Features:
- ✅ Free tier: perfect for small sites
- ✅ Beautiful content editing interface
- ✅ Powerful query language (GROQ)
- ✅ Content versioning & previews
- ✅ Already integrated on /news page

---

## Google Forms Setup

**Event Registrations**

### Steps:
1. Go to [forms.google.com](https://forms.google.com)
2. Create a new form: **"Katete Parish Event Registration"**
3. Add fields:
   - Full Name (short text)
   - Email (email)
   - Phone Number (short text)
   - Event (multiple choice)
   - Number of attendees (number)
   - Special requirements (long text)

4. Click **Send** (top right) → **Embed** tab
5. Copy the embed code

6. To add to a page, paste in the route file:
```tsx
<iframe 
  src="https://docs.google.com/forms/d/YOUR_FORM_ID/viewform?embedded=true" 
  width="640" 
  height="500" 
  frameBorder="0" 
  marginHeight="0" 
  marginWidth="0"
>
  Loading…
</iframe>
```

### Features:
- ✅ Free
- ✅ Responses automatically sent to your email
- ✅ Spreadsheet export available
- ✅ No backend needed

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Stripe (Donations)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
VITE_BASE_URL=http://localhost:5173

# Sanity CMS (News & Blog)
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production

# For production, update these URLs:
# VITE_BASE_URL=https://katetecatholic.org
```

**Never commit `.env.local` to git!** It's in `.gitignore` by default.

---

## Testing Checklist

- [ ] Contact form submits to Formspree
- [ ] Prayer requests submit to Formspree
- [ ] Donation form loads Stripe checkout
- [ ] Newsletter form appears on home page
- [ ] Blog posts load from Sanity CMS
- [ ] All forms have proper error handling

---

## Support & Documentation

- **Formspree:** [docs.formspree.io](https://docs.formspree.io)
- **Stripe:** [stripe.com/docs](https://stripe.com/docs)
- **Mailchimp:** [mailchimp.com/help](https://mailchimp.com/help)
- **Sanity:** [sanity.io/docs](https://sanity.io/docs)
- **Google Forms:** [support.google.com/docs](https://support.google.com/docs)

---

## Notes for Deployment

When deploying to production:
1. Update Stripe keys from `test` to `live`
2. Set correct `VITE_BASE_URL` for your domain
3. Update Formspree form IDs if using different production instance
4. Configure Mailchimp list for production audience
5. Ensure Sanity project is published

Good luck! 🙏
