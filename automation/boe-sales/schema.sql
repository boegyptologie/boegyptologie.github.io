PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS quotes (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  provider_expires_at INTEGER NOT NULL,
  customer_json TEXT NOT NULL,
  shipping_options_json TEXT NOT NULL,
  checkout_option_id TEXT,
  stripe_customer_id TEXT,
  stripe_session_id TEXT UNIQUE,
  checkout_url TEXT,
  checkout_expires_at INTEGER,
  currency TEXT NOT NULL CHECK (currency = 'EUR'),
  book_amount INTEGER NOT NULL CHECK (book_amount = 3500)
);
CREATE INDEX IF NOT EXISTS quotes_created_at ON quotes(created_at);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  quote_id TEXT NOT NULL,
  stripe_session_id TEXT NOT NULL UNIQUE,
  stripe_payment_intent_id TEXT,
  shipping_option_id TEXT NOT NULL,
  total_amount INTEGER NOT NULL,
  currency TEXT NOT NULL CHECK (currency = 'EUR'),
  status TEXT NOT NULL DEFAULT 'test_payment_pending',
  fulfillment_status TEXT NOT NULL DEFAULT 'disabled',
  created_at INTEGER NOT NULL,
  paid_at INTEGER
);

CREATE TABLE IF NOT EXISTS stripe_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  received_at INTEGER NOT NULL,
  processed_at INTEGER
);

CREATE TABLE IF NOT EXISTS rate_limits (
  bucket TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS rate_limits_expiry ON rate_limits(expires_at);
