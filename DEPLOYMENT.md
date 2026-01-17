# Deployment Guide - Strategic AI Academy

A comprehensive, cloud-agnostic deployment guide supporting multiple platforms: **Google Cloud Run**, **Vercel**, and **Azure Container Apps**.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Platform Selection](#platform-selection)
3. [Google Cloud Run Deployment](#google-cloud-run-deployment)
4. [Vercel Deployment](#vercel-deployment)
5. [Azure Container Apps Deployment](#azure-container-apps-deployment)
6. [Stripe Payment Setup](#stripe-payment-setup)
7. [Course Content Management](#course-content-management)
8. [Environment Variables Reference](#environment-variables-reference)
9. [Post-Deployment Configuration](#post-deployment-configuration)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts
- GitHub account (for code repository)
- Firebase account (for authentication & database)
- One of: Google Cloud, Vercel, or Azure account

### Optional Services
- Stripe account (for payments)
- Custom domain (for professional branding)
- SendGrid/Resend (for transactional emails)

### Local Development Tools
- Node.js 20+
- npm or yarn
- Git
- Docker (for container deployments)

---

## Platform Selection

Choose the platform that best fits your needs:

| Platform | Best For | Pros | Cons | Cost |
|----------|----------|------|------|------|
| **Google Cloud Run** | Production apps, scalability | Auto-scaling, pay-per-use, Firebase integration | Requires Docker knowledge | ~$5-50/month |
| **Vercel** | Fast deployment, Next.js apps | Zero config, instant previews, CDN | Limited server functions on free tier | Free-$20/month |
| **Azure** | Enterprise, Microsoft ecosystem | Enterprise features, compliance | More complex setup | ~$10-100/month |

**Current Status**: ✅ Deployed to Google Cloud Run at https://zavia-ai-academy-oaut5pm4la-uc.a.run.app

---

## Google Cloud Run Deployment

### Quick Deploy

```bash
# 1. Set environment variables from .env.local
export $(cat .env.local | grep -v '^#' | xargs)

# 2. Run deployment script
chmod +x deploy.sh
./deploy.sh
```

### Manual Deployment

#### Step 1: Setup GCloud CLI

```bash
# Install Google Cloud CLI
# https://cloud.google.com/sdk/docs/install

# Login and set project
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

#### Step 2: Enable Required APIs

```bash
gcloud services enable cloudbuild.googleapis.com \
  run.googleapis.com \
  containerregistry.googleapis.com
```

#### Step 3: Deploy

```bash
# Build and deploy
gcloud builds submit --config=cloudbuild.yaml

# Get your service URL
gcloud run services describe zavia-ai-academy \
  --region=us-central1 \
  --format='value(status.url)'
```

#### Step 4: Update Firebase Settings

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Navigate to **Authentication** → **Settings** → **Authorized domains**
3. Add your Cloud Run domain (e.g., `your-service-abc123.run.app`)

### Switching FROM Google Cloud Run

To migrate to another platform:

1. Export environment variables: `gcloud run services describe zavia-ai-academy --format=yaml > env-backup.yaml`
2. Follow the deployment guide for your target platform below
3. Update Firebase authorized domains
4. Update Stripe webhook URL
5. Test thoroughly before deleting Cloud Run service

---

## Vercel Deployment

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/zavia-ai-academy)

### Manual Deployment

#### Step 1: Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **Import Project**
3. Select your GitHub repository
4. Vercel will auto-detect Next.js

#### Step 2: Configure Environment Variables

In Vercel project settings → **Environment Variables**, add:

```bash
# Firebase (Client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (Server-side)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# App URL (will be your Vercel domain)
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app

# Stripe (Optional - see Stripe Setup section)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

#### Step 3: Deploy

Click **Deploy** and wait for build to complete.

#### Step 4: Update Firebase Settings

Add your Vercel domain to Firebase authorized domains:
- `your-project.vercel.app`
- Any custom domains you add

### Vercel-Specific Configuration

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_APP_URL": "https://your-project.vercel.app"
  }
}
```

### Switching FROM Vercel

1. Export environment variables from Vercel dashboard
2. Remove `vercel.json` if switching to containerized deployment
3. Follow deployment guide for target platform
4. Update DNS if using custom domain

---

## Azure Container Apps Deployment

### Prerequisites

```bash
# Install Azure CLI
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Login
az login
```

### Step 1: Create Resources

```bash
# Set variables
RESOURCE_GROUP="zavia-academy-rg"
LOCATION="eastus"
CONTAINER_APP_ENV="zavia-env"
CONTAINER_APP_NAME="zavia-academy"
REGISTRY_NAME="zaviaregistry"

# Create resource group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create container registry
az acr create --resource-group $RESOURCE_GROUP \
  --name $REGISTRY_NAME --sku Basic

# Create container app environment
az containerapp env create \
  --name $CONTAINER_APP_ENV \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION
```

### Step 2: Build and Push Docker Image

```bash
# Build image
docker build -t $REGISTRY_NAME.azurecr.io/zavia-academy:latest .

# Login to registry
az acr login --name $REGISTRY_NAME

# Push image
docker push $REGISTRY_NAME.azurecr.io/zavia-academy:latest
```

### Step 3: Deploy Container App

```bash
# Create container app
az containerapp create \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --environment $CONTAINER_APP_ENV \
  --image $REGISTRY_NAME.azurecr.io/zavia-academy:latest \
  --target-port 3000 \
  --ingress external \
  --registry-server $REGISTRY_NAME.azurecr.io \
  --env-vars \
    NEXT_PUBLIC_FIREBASE_API_KEY=secretref:firebase-api-key \
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=secretref:firebase-project-id \
    # ... add all environment variables

# Get URL
az containerapp show \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --query properties.configuration.ingress.fqdn
```

### Step 4: Configure Secrets

```bash
# Add secrets
az containerapp secret set \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --secrets \
    firebase-api-key=YOUR_API_KEY \
    stripe-secret-key=YOUR_STRIPE_KEY
```

### Switching FROM Azure

1. Export secrets: `az containerapp secret list`
2. Stop container app to avoid charges
3. Follow deployment guide for target platform

---

## Stripe Payment Setup

### When to Add Stripe

Add Stripe when you're ready to:
- Accept payments for premium content
- Offer subscription-based access
- Monetize the platform

### Step 1: Create Stripe Account

1. Sign up at [stripe.com](https://stripe.com)
2. Complete account verification
3. Get your API keys from [Dashboard](https://dashboard.stripe.com/apikeys)

### Step 2: Create Products and Prices

#### Option A: Via Stripe Dashboard

1. Go to [Products](https://dashboard.stripe.com/products)
2. Click **Add product**
3. Create products for each tier:

**Suggested Pricing Structure:**

| Product | Description | Price | Billing |
|---------|-------------|-------|---------|
| AI Primer | Fundamentals only | $49 | One-time |
| Application Level | Apply AI to real problems | $149 | One-time or Monthly $29 |
| Systems Level | Design AI systems | $299 | One-time or Monthly $49 |
| Mastery Level | Strategic AI leadership | $499 | One-time or Monthly $79 |

4. Copy each **Price ID** (starts with `price_`)

#### Option B: Via API (for automation)

```bash
# Create product
curl https://api.stripe.com/v1/products \
  -u sk_test_YOUR_KEY: \
  -d name="AI Primer" \
  -d description="Master AI fundamentals"

# Create price
curl https://api.stripe.com/v1/prices \
  -u sk_test_YOUR_KEY: \
  -d product=prod_XXX \
  -d unit_amount=4900 \
  -d currency=usd
```

### Step 3: Configure Environment Variables

Add to your deployment platform:

```bash
# Stripe Keys (find in Dashboard → Developers → API keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...  # Or pk_test_ for testing
STRIPE_SECRET_KEY=sk_live_...                    # Or sk_test_ for testing

# Price IDs (from products you created)
STRIPE_PRICE_PRIMER=price_...
STRIPE_PRICE_APPLICATION=price_...
STRIPE_PRICE_SYSTEMS=price_...
STRIPE_PRICE_MASTERY=price_...

# Enable Stripe features
STRIPE_ENABLED=true
```

### Step 4: Set Up Webhook

1. Go to [Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Endpoint URL: `https://YOUR-DOMAIN/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy **Signing secret** to `STRIPE_WEBHOOK_SECRET`

### Step 5: Test Payments

Use Stripe test cards:

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Card declined |
| 4000 0025 0000 3155 | Requires authentication (3D Secure) |

Use any:
- Future expiration date
- Any 3-digit CVC
- Any billing ZIP code

### Step 6: Go Live

When ready for production:

1. Complete [Stripe account activation](https://dashboard.stripe.com/account/onboarding)
2. Replace test keys with live keys (`pk_live_`, `sk_live_`)
3. Test with real card (refund immediately)
4. Monitor [Stripe Dashboard](https://dashboard.stripe.com) for activity

### Removing Stripe

If you want to disable payments:

1. Set `STRIPE_ENABLED=false` in environment variables
2. Payment buttons will be hidden
3. Courses can be accessed freely or gated another way

---

## Course Content Management

### Current Content System

Content is stored in **Firestore** (Firebase database). No admin panel exists yet.

### Option 1: Manual Firestore Updates (Current)

#### Access Firestore

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click **Firestore Database**

#### Course Structure

```
courses/
  ├── application/
  │   ├── title: "Application Level"
  │   ├── description: "..."
  │   ├── level: "application"
  │   ├── order: 1
  │   └── modules: [...]
  ├── systems/
  └── mastery/

modules/
  ├── module-1/
  │   ├── title: "Introduction to AI"
  │   ├── courseId: "application"
  │   ├── order: 1
  │   ├── content: "..."
  │   └── exercises: [...]
```

#### Add New Course

Click **Start collection** or add document:

```json
{
  "id": "strategic-thinking",
  "title": "Strategic AI Thinking",
  "slug": "strategic-thinking",
  "description": "Master strategic decision-making with AI",
  "level": "advanced",
  "order": 4,
  "duration": "6 weeks",
  "modules": 12,
  "price": 399,
  "published": true,
  "prerequisites": ["application", "systems"]
}
```

#### Add Module Content

```json
{
  "id": "module-1",
  "courseId": "strategic-thinking",
  "title": "Introduction to Strategic AI",
  "order": 1,
  "content": "# Module 1\n\n## Learning Objectives\n...",
  "videoUrl": "https://...",
  "duration": "45 min",
  "exercises": [
    {
      "title": "Exercise 1",
      "description": "...",
      "type": "multiple-choice"
    }
  ]
}
```

### Option 2: Use Firebase Admin SDK (Programmatic)

Create a script to add content:

```typescript
// scripts/add-course.ts
import { getAdminDb } from '@/lib/firebase/admin';

async function addCourse() {
  const db = getAdminDb();

  await db.collection('courses').doc('new-course').set({
    title: 'New Course',
    description: 'Description',
    level: 'advanced',
    order: 5,
    published: true,
    createdAt: new Date()
  });

  console.log('Course added!');
}

addCourse();
```

Run: `npx tsx scripts/add-course.ts`

### Option 3: Build Admin Panel (Recommended for Scale)

#### Future Enhancement Roadmap

**Phase 1: Basic CMS** (4-6 weeks)
- Admin authentication (role-based)
- Course CRUD operations
- Module editor with markdown support
- Media upload (videos, images, PDFs)

**Phase 2: Content Management** (6-8 weeks)
- Drag-and-drop course ordering
- Rich text editor (TipTap or Slate)
- Video hosting integration (YouTube, Vimeo, or Cloudflare Stream)
- Quiz/exercise builder

**Phase 3: Full LMS** (3-4 months)
- Student progress tracking
- Certificate generation
- Discussion forums
- Live sessions/webinars
- Analytics dashboard

**Tech Stack Recommendation:**
- UI: Radix UI + Tailwind (consistent with current design)
- Forms: React Hook Form + Zod
- Editor: TipTap (markdown + WYSIWYG)
- File Upload: Cloudflare R2 or Firebase Storage
- Access Control: Firebase Security Rules

### Option 4: Use Existing CMS

Integrate a headless CMS:

**Sanity.io** (Recommended)
- Real-time collaboration
- Structured content
- Free tier: 3 users, unlimited API calls
- Setup time: 2-3 days

**Contentful**
- Enterprise-grade
- Strong versioning
- Free tier: 1 user, 25K records
- Setup time: 3-4 days

**Strapi** (Self-hosted)
- Full control
- Open source
- Host on same infrastructure
- Setup time: 1 week

### Quick Win: Seed Script

Use the existing seed script to add initial content:

```bash
# Edit scripts/seed-firestore.ts
# Add your course content
# Run:
npm run seed:firestore
```

### Content Update Workflow

**For immediate content updates:**

1. Edit content in Firestore Console
2. Changes appear instantly (no deployment needed)
3. Use Firestore security rules to protect content

**For new features:**

1. Update data models in code
2. Update Firestore security rules
3. Deploy code changes
4. Add content via Firestore

---

## Environment Variables Reference

### Platform-Agnostic Variables

These work across all platforms:

```bash
# Firebase Client (Public - safe to expose)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXX (optional)

# Firebase Admin (Private - server only)
FIREBASE_ADMIN_PROJECT_ID=your-project
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production

# Stripe (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PRIMER=price_...
STRIPE_PRICE_APPLICATION=price_...
STRIPE_PRICE_SYSTEMS=price_...
STRIPE_PRICE_MASTERY=price_...
STRIPE_ENABLED=true

# Email (Optional)
SENDGRID_API_KEY=SG....
EMAIL_FROM=noreply@yourdomain.com

# Analytics (Optional)
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXX
NEXT_PUBLIC_MIXPANEL_TOKEN=xxxxx
```

### Platform-Specific Notes

**Google Cloud Run:**
- Pass via `--set-env-vars` in gcloud command
- Or use Secret Manager for sensitive values

**Vercel:**
- Add in dashboard under **Settings** → **Environment Variables**
- Separate Production, Preview, Development values

**Azure:**
- Use Container App secrets
- Reference as `secretref:secret-name`

---

## Post-Deployment Configuration

### 1. Custom Domain Setup

#### Google Cloud Run

```bash
gcloud run domain-mappings create \
  --service zavia-ai-academy \
  --domain yourdomain.com \
  --region us-central1
```

#### Vercel

1. Go to project **Settings** → **Domains**
2. Add your domain
3. Follow DNS configuration instructions

#### Azure

```bash
az containerapp hostname add \
  --hostname yourdomain.com \
  --name zavia-academy \
  --resource-group zavia-academy-rg
```

### 2. SSL/HTTPS

All platforms provide automatic SSL:
- ✅ Google Cloud Run: Auto SSL
- ✅ Vercel: Auto SSL via Let's Encrypt
- ✅ Azure: Auto managed certificates

### 3. Firebase Security Rules

Update Firestore rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Courses are public read, admin write
    match /courses/{courseId} {
      allow read: if true;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Enrollments: users can only see their own
    match /enrollments/{enrollmentId} {
      allow read, write: if request.auth != null &&
        resource.data.userId == request.auth.uid;
    }
  }
}
```

Deploy rules:

```bash
firebase deploy --only firestore:rules
```

### 4. Email Configuration

#### Option A: SendGrid

```bash
# Add to environment variables
SENDGRID_API_KEY=SG.xxx
EMAIL_FROM=noreply@yourdomain.com
```

#### Option B: Resend

```bash
RESEND_API_KEY=re_xxx
EMAIL_FROM=noreply@yourdomain.com
```

### 5. Monitoring & Analytics

**Recommended Setup:**

1. **Error Tracking**: [Sentry](https://sentry.io)
   ```bash
   SENTRY_DSN=https://xxx@sentry.io/xxx
   ```

2. **Analytics**: Google Analytics 4
   ```bash
   NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
   ```

3. **Performance**: Vercel Analytics or Google Cloud Monitoring

---

## Troubleshooting

### Login Not Working

**Symptom:** Users can't sign in, redirects fail, or errors appear

**Fixes:**

1. **Check Firebase Authorized Domains**
   - Go to Firebase Console → Authentication → Settings
   - Add your deployment domain
   - Include both with and without `www`

2. **Verify Environment Variables**
   ```bash
   # All NEXT_PUBLIC_FIREBASE_* variables must be set
   # Check in deployment platform dashboard
   ```

3. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or use incognito mode

4. **Check Firebase Authentication Methods**
   - Enable Email/Password in Firebase Console
   - Enable Google Sign-In if using

5. **Inspect Browser Console**
   - Look for Firebase errors
   - Common: "auth/configuration-not-found" = wrong API key

### Platform-Specific Issues

#### Google Cloud Run

**Build Failures:**
```bash
# Check build logs
gcloud builds list --limit=5
gcloud builds log BUILD_ID
```

**Service Not Starting:**
```bash
# Check logs
gcloud run logs read zavia-ai-academy --region=us-central1 --limit=50
```

#### Vercel

**Build Errors:**
- Check deployment logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally first

**Environment Variables Not Loading:**
- Redeploy after adding variables
- Check variable names (case-sensitive)

#### Azure

**Container Won't Start:**
```bash
# View logs
az containerapp logs show \
  --name zavia-academy \
  --resource-group zavia-academy-rg
```

### General Issues

**Stripe Webhooks Failing:**
1. Verify webhook URL is correct
2. Check signing secret matches
3. View failed events in Stripe Dashboard
4. Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

**Firestore Permission Denied:**
1. Check security rules
2. Ensure user is authenticated
3. Verify JWT token is valid

**Slow Performance:**
1. Enable CDN (Vercel has this by default)
2. Use Cloud CDN for Google Cloud Run
3. Optimize images with Next.js Image component
4. Implement caching strategies

---

## Migration Between Platforms

### Checklist

- [ ] Export environment variables from current platform
- [ ] Deploy to new platform (follow guide above)
- [ ] Test thoroughly on new platform
- [ ] Update DNS to point to new platform
- [ ] Update Firebase authorized domains
- [ ] Update Stripe webhook URL
- [ ] Monitor for 24-48 hours
- [ ] Delete old deployment

### Zero-Downtime Migration

1. Deploy to new platform (keep old running)
2. Test at new URL
3. Update DNS with low TTL (5 minutes)
4. Monitor both platforms
5. Once traffic shifts, delete old deployment

---

## Quick Reference

### Deployment Commands

```bash
# Google Cloud Run
./deploy.sh

# Vercel
vercel --prod

# Azure
az containerapp update --name zavia-academy --resource-group zavia-academy-rg
```

### View Logs

```bash
# Google Cloud Run
gcloud run logs read zavia-ai-academy --region=us-central1

# Vercel
vercel logs

# Azure
az containerapp logs show --name zavia-academy --resource-group zavia-academy-rg
```

### Rollback

```bash
# Google Cloud Run
gcloud run services update-traffic zavia-ai-academy --to-revisions=PREVIOUS_REVISION=100

# Vercel
# Use dashboard to promote previous deployment

# Azure
az containerapp revision list --name zavia-academy --resource-group zavia-academy-rg
az containerapp ingress traffic set --revision-weight REVISION=100
```

---

## Getting Help

**Platform-Specific:**
- Google Cloud: [Support](https://cloud.google.com/support)
- Vercel: [Discord](https://vercel.com/discord) or [Support](https://vercel.com/support)
- Azure: [Support](https://azure.microsoft.com/support)

**Service-Specific:**
- Firebase: [Documentation](https://firebase.google.com/docs)
- Stripe: [Support](https://support.stripe.com)
- Next.js: [Documentation](https://nextjs.org/docs)

---

**You're ready to deploy to any platform!** 🚀

Choose the platform that fits your needs, and you can always migrate later.
