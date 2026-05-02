-- Dedicated table for Amira's push subscriptions (one row per device)
CREATE TABLE IF NOT EXISTS amira_push_subscriptions (
  id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  endpoint  TEXT NOT NULL UNIQUE,
  p256dh    TEXT NOT NULL,
  auth      TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow Amira to read/write her own subscriptions (anon key is fine since panel uses it)
ALTER TABLE amira_push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow all" ON amira_push_subscriptions FOR ALL USING (true) WITH CHECK (true);
