-- Fix in_stock column for products
-- Run this in Supabase SQL Editor

-- Ensure in_stock column exists and has proper default
ALTER TABLE products 
ALTER COLUMN in_stock SET DEFAULT TRUE;

-- Set in_stock to TRUE for all products that are NULL
UPDATE products SET in_stock = TRUE WHERE in_stock IS NULL;

-- Verify the column exists and has values
SELECT id, name, in_stock FROM products;
