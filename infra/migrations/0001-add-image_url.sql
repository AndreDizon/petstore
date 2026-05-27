-- Add image_url column to pets if it does not already exist
ALTER TABLE pets ADD COLUMN IF NOT EXISTS image_url VARCHAR(1024);
