# Strategic AI Judgment Primer - Setup Guide

## Overview

The Strategic AI Judgment Primer is a $147 paid product offering a 90-minute deep dive into evaluating AI output in high-stakes decisions. This guide covers setup and configuration.

## Database Setup

### 1. Run Migration

Apply the database migration to create the `primer_purchases` table:

```sql
-- From migrations/005_create_primer_purchases.sql
CREATE TABLE IF NOT EXISTS primer_purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_session_id VARCHAR(255) NOT NULL UNIQUE,
  stripe_payment_intent VARCHAR(255),
  amount_cents INTEGER NOT NULL DEFAULT 14700,
  purchased_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_primer_purchases_user_id ON primer_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_primer_purchases_stripe_session ON primer_purchases(stripe_session_id);
```

Execute this against your Vercel Postgres database:

```bash
# Using Vercel CLI
psql $(vercel env pull && grep POSTGRES_URL .env.local | cut -d '=' -f2-) -f migrations/005_create_primer_purchases.sql

# Or via Vercel dashboard SQL console
```

## Stripe Configuration

### 2. Create Stripe Product & Price

1. **Log in to Stripe Dashboard** → Products
2. **Create Product:**
   - Name: `Strategic AI Judgment Primer`
   - Description: `90-minute deep dive into evaluating AI output in high-stakes decisions`
   - Type: `One-time`

3. **Add Price:**
   - Amount: `$147.00` USD
   - Billing: `One-time payment`
   - Copy the Price ID (starts with `price_...`)

### 3. Configure Environment Variables

Add the Stripe Price ID to your environment:

```bash
# .env.local (for local development)
STRIPE_PRICE_PRIMER=price_xxxxxxxxxxxxx

# Vercel (for production)
vercel env add STRIPE_PRICE_PRIMER
# Enter the price ID when prompted
```

### 4. Verify Stripe Webhook

The existing webhook handler (`/api/webhooks/stripe`) will automatically process primer purchases if configured. Ensure the webhook is set up for these events:

- `checkout.session.completed`
- `payment_intent.succeeded`

## Testing the Flow

### Local Testing

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to primer page:**
   ```
   http://localhost:3000/primer
   ```

3. **Test checkout (requires Stripe test mode):**
   - Create an account or sign in
   - Click "Purchase Primer"
   - Use Stripe test card: `4242 4242 4242 4242`
   - Complete checkout
   - Verify redirect to success page
   - Check dashboard for primer access

### Production Testing

1. **Deploy to Vercel**
2. **Use Stripe test mode** initially
3. **Test complete purchase flow**
4. **Verify database entry** in `primer_purchases` table
5. **Switch to live mode** when ready

## User Flow

```
1. Landing Page (/primer)
   ↓
2. Checkout Page (/primer/checkout) [requires auth]
   ↓
3. Stripe Checkout [external]
   ↓
4. Success Page (/primer/success)
   ↓
5. Content Page (/primer/content) [access-gated]
```

## Access Control

Access to `/primer/content` is gated by:
1. User authentication (NextAuth session)
2. Purchase verification (record in `primer_purchases` table)

Users without access are redirected to `/primer`.

## Dashboard Integration

Users with primer access will see a "Your Purchased Content" section on their dashboard with a direct link to the primer content.

## Key Files

- **Sales Page:** `src/app/primer/page.tsx`
- **Checkout:** `src/app/primer/checkout/page.tsx`
- **Success:** `src/app/primer/success/page.tsx`
- **Content:** `src/app/primer/content/page.tsx`
- **Checkout API:** `src/app/api/primer/checkout/route.ts`
- **Verification API:** `src/app/api/primer/verify/route.ts`
- **Access Check API:** `src/app/api/primer/access/route.ts`
- **Migration:** `migrations/005_create_primer_purchases.sql`
- **Stripe Config:** `src/lib/stripe.ts`

## Troubleshooting

### "Payment processing is not configured"

The `STRIPE_PRICE_PRIMER` environment variable is not set. Add it per step 3 above.

### "Database not initialized"

The `primer_purchases` table doesn't exist. Run the migration per step 1 above.

### "Failed to verify purchase"

Check Stripe webhook configuration and ensure `checkout.session.completed` events are being sent to `/api/webhooks/stripe`.

### User has access but database shows no record

Check Stripe session ID in the URL after successful payment and verify it matches what's in the database. The verification endpoint should have created the record automatically.

## Revenue Tracking

Query primer purchases:

```sql
-- Total revenue
SELECT COUNT(*) as purchases, SUM(amount_cents)/100 as total_revenue_usd
FROM primer_purchases;

-- Purchases by date
SELECT DATE(purchased_at) as date, COUNT(*) as purchases, SUM(amount_cents)/100 as revenue_usd
FROM primer_purchases
GROUP BY DATE(purchased_at)
ORDER BY date DESC;

-- Recent purchases
SELECT u.email, pp.purchased_at, pp.amount_cents/100 as amount_usd
FROM primer_purchases pp
JOIN users u ON pp.user_id = u.id
ORDER BY pp.purchased_at DESC
LIMIT 10;
```

## Next Steps

After successful primer launch:
- Monitor conversion rates from landing page → checkout → purchase
- Collect user feedback on content
- Consider additional paid offerings (systems-level deep dives, custom workshops)
- Track which archetype groups purchase most frequently (via diagnostic results)
