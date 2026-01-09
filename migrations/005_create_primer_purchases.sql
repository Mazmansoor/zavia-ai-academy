-- Create table for tracking Strategic AI Judgment Primer purchases
CREATE TABLE IF NOT EXISTS primer_purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_session_id VARCHAR(255) NOT NULL UNIQUE,
  stripe_payment_intent VARCHAR(255),
  amount_cents INTEGER NOT NULL DEFAULT 14700, -- $147.00
  purchased_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index for faster user lookups
CREATE INDEX IF NOT EXISTS idx_primer_purchases_user_id ON primer_purchases(user_id);

-- Create index for Stripe session ID lookups
CREATE INDEX IF NOT EXISTS idx_primer_purchases_stripe_session ON primer_purchases(stripe_session_id);

-- Add comment explaining the table
COMMENT ON TABLE primer_purchases IS 'Tracks purchases of the Strategic AI Judgment Primer (90-minute paid product)';
