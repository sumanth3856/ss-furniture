-- Migration: Add in_stock column to products table if it doesn't exist
-- Run this in Supabase SQL Editor

-- Add in_stock column if it doesn't exist
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT TRUE;

-- Set all existing products to in_stock = true if they have no value
UPDATE products SET in_stock = TRUE WHERE in_stock IS NULL;

-- Verify the column exists and has correct data
SELECT id, name, in_stock FROM products LIMIT 10;
