# Quick Start Guide - Fix Login & Enable Payments

## 🔥 Critical: Fix Login Issue

Your app is deployed but login won't work until you complete these steps:

### Step 1: Add Cloud Run Domain to Firebase (REQUIRED)

1. Go to [Firebase Console](https://console.firebase.google.com/project/zavia-481717/authentication/settings)
2. Click **Authentication** → **Settings** → **Sign-in method** tab
3. Scroll down to **Authorized domains**
4. Click **Add domain**
5. Add: `zavia-ai-academy-oaut5pm4la-uc.a.run.app`
6. Click **Add**

### Step 2: Enable Sign-In Methods

1. Still in Firebase Console → **Authentication** → **Sign-in method**
2. Click **Email/Password** → **Enable** → **Save**
3. (Optional) Click **Google** → **Enable** → Add your email → **Save**

### Step 3: Test Login

1. Visit https://zavia-ai-academy-oaut5pm4la-uc.a.run.app/signup
2. Create a test account
3. Should redirect to `/dashboard`

**If it still doesn't work:**
- Check browser console for errors (F12)
- Clear browser cache (Ctrl+Shift+Del)
- Try incognito mode

---

## 💳 Enable Stripe Payments (Optional)

### When You're Ready to Monetize

1. **Create Stripe Account**
   - Sign up at [stripe.com](https://stripe.com/register)
   - Complete business verification

2. **Get API Keys**
   - Go to [Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
   - Toggle "Test mode" ON (for testing)
   - Copy **Publishable key** (pk_test_...)
   - Copy **Secret key** (sk_test_...) - keep this secret!

3. **Create Products**
   - Go to [Products](https://dashboard.stripe.com/test/products)
   - Click **Add product**
   - Create pricing tiers (see [DEPLOYMENT.md](DEPLOYMENT.md#stripe-payment-setup) for recommendations)
   - Copy each **Price ID** (price_...)

4. **Add to Google Cloud**

   Update your Cloud Run service with Stripe keys:

   ```bash
   gcloud run services update zavia-ai-academy \
     --region=us-central1 \
     --update-env-vars \
       NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY,\
       STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY,\
       STRIPE_PRICE_PRIMER=price_YOUR_ID,\
       STRIPE_ENABLED=true
   ```

5. **Set Up Webhook**
   - Go to [Webhooks](https://dashboard.stripe.com/test/webhooks)
   - Click **Add endpoint**
   - URL: `https://zavia-ai-academy-oaut5pm4la-uc.a.run.app/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_*`
   - Copy **Signing secret** (whsec_...)
   - Add to Cloud Run:
     ```bash
     gcloud run services update zavia-ai-academy \
       --region=us-central1 \
       --update-env-vars STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
     ```

6. **Test Payment**
   - Use test card: `4242 4242 4242 4242`
   - Any future date, any CVC
   - Should create successful checkout session

---

## 📚 Add Course Content

### Quick Method: Use Firestore Console

1. Go to [Firestore Database](https://console.firebase.google.com/project/zavia-481717/firestore)
2. Click **Start collection** (or edit existing)
3. Collection ID: `courses`
4. Add course documents:

   ```json
   {
     "title": "AI Foundations",
     "slug": "ai-foundations",
     "description": "Master the fundamentals of AI",
     "level": "beginner",
     "duration": "4 weeks",
     "modules": 8,
     "price": 99,
     "published": true,
     "order": 1
   }
   ```

5. Create `modules` subcollection with lesson content

### Better Method: Use Seed Script

1. Edit `scripts/seed-firestore.ts` with your content
2. Run: `npm run seed:firestore`
3. Content appears instantly on your site

---

## 🎨 Improve UI/UX (Next Step)

The current UI is minimal. Here's what we'll enhance:

1. **Premium Typography** - Better fonts, hierarchy
2. **Professional Color Scheme** - Trust-building blues/grays
3. **Hero Section** - Compelling value proposition
4. **Social Proof** - Testimonials, trust badges
5. **Better CTAs** - Clear, action-oriented buttons
6. **Modern Animations** - Subtle, professional motion
7. **Mobile-First** - Perfect on all devices

**Status**: Coming in next update...

---

## ✅ Checklist

- [ ] Add Cloud Run domain to Firebase authorized domains
- [ ] Enable Email/Password in Firebase
- [ ] Test signup/login flow
- [ ] (Optional) Set up Stripe test mode
- [ ] (Optional) Add course content to Firestore
- [ ] Deploy UI/UX improvements

---

## 🆘 Quick Troubleshooting

**Login returns error:**
- Error: "auth/unauthorized-domain" → Add domain to Firebase authorized domains
- Error: "auth/invalid-api-key" → Check environment variables in Cloud Run
- Error: "auth/operation-not-allowed" → Enable sign-in method in Firebase

**Can't see courses:**
- Add content to Firestore `courses` collection
- Check Firestore security rules allow read access

**Stripe not working:**
- Verify `STRIPE_ENABLED=true` in environment variables
- Check that all Stripe keys are set correctly
- Use test mode keys (pk_test_, sk_test_) for development

---

**Need more help?** See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive guide.
