-- Allows alumna_id=0 as a reserved slot for Amira's own push subscription
ALTER TABLE push_subscriptions DROP CONSTRAINT IF EXISTS push_subscriptions_alumna_id_fkey;
