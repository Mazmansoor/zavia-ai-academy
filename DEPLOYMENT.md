# Deployment Guide - Strategic AI Academy

This guide will walk you through deploying the full-stack Strategic AI Academy platform to Vercel.

## 🚀 Quick Start

### 1. Prerequisites

- Vercel account
- Stripe account (for payments)
- GitHub account

### 2. Deploy to Vercel

1. Push your code to GitHub (already done)
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your repository
4. Vercel will auto-detect Next.js

### 3. Set Up Vercel Postgres

1. In your Vercel project, go to the **Storage** tab
2. Click **Create Database** → **Postgres**
3. Choose a name (e.g., "strategic-ai-db")
4. Click **Create**
5. Go to **.env.local** tab and copy all connection strings

### 4. Initialize Database

1. Go to your database in Vercel
2. Click on the **Query** tab
3. Run the schema file:
   - Copy the content of `src/lib/db/schema.sql`
   - Paste and execute in the Query editor
4. Run the seed file:
   - Copy the content of `src/lib/db/seed.sql`
   - Paste and execute in the Query editor

### 5. Configure Environment Variables

In Vercel project settings → Environment Variables, add:

```bash
# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URL
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

# Stripe Price IDs (set after creating products in Stripe)
STRIPE_PRICE_APPLICATION=price_...
STRIPE_PRICE_SYSTEMS=price_...
STRIPE_PRICE_MASTERY=price_...
```

### 6. Set Up Stripe

#### Create Products

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/products)
2. Create products for each tier:
   - **Application Level** - $99
   - **Systems Level** - $149
   - **Mastery Level** - $199
3. Copy each Price ID to your environment variables

#### Set Up Webhook

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Endpoint URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** to `STRIPE_WEBHOOK_SECRET`

### 7. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output to `NEXTAUTH_SECRET`

### 8. Deploy

After setting all environment variables:

1. Redeploy your project from Vercel dashboard
2. Or push a new commit to trigger auto-deployment

## ✅ Verify Deployment

1. Visit your site: `https://your-domain.vercel.app`
2. Test signup/login
3. Take diagnostic quiz
4. Browse courses
5. Test checkout (use Stripe test cards)

## 🧪 Testing

### Stripe Test Cards

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future date for expiry, any 3-digit CVC

## 📝 Post-Deployment Checklist

- [ ] Database tables created and seeded
- [ ] Environment variables configured
- [ ] Stripe products created
- [ ] Stripe webhook configured
- [ ] NextAuth secret generated
- [ ] Test user signup/login
- [ ] Test diagnostic quiz
- [ ] Test course enrollment
- [ ] Test payment flow
- [ ] Verify webhook events in Stripe dashboard

## 🔧 Troubleshooting

### Database Connection Issues

- Verify all Postgres environment variables are set correctly
- Check that database is in the same region as your Vercel project

### Authentication Not Working

- Verify `NEXTAUTH_URL` matches your domain
- Ensure `NEXTAUTH_SECRET` is set
- Check browser console for errors

### Stripe Checkout Failing

- Verify all Stripe keys are correct (publishable and secret)
- Ensure webhook secret is configured
- Check Stripe dashboard logs

### Webhook Not Receiving Events

- Verify webhook URL is correct
- Check webhook signing secret
- Look at Stripe webhook logs for errors

## 🎯 Next Steps

1. **Custom Domain**: Add your custom domain in Vercel settings
2. **Email Service**: Integrate SendGrid or similar for email notifications
3. **Analytics**: Add Vercel Analytics or Google Analytics
4. **Monitoring**: Set up error tracking with Sentry
5. **Content**: Add actual course content and modules

## 📚 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Stripe Integration Guide](https://stripe.com/docs/payments/checkout)
- [NextAuth.js Docs](https://next-auth.js.org/)

## 🆘 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review Stripe dashboard logs
3. Check database query logs
4. Open an issue on GitHub

---

**Ready to launch!** 🚀
