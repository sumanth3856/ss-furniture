-- Run this in Supabase SQL Editor to disable RLS
-- This allows anonymous device-based cart/wishlist

-- Disable RLS on cart_items
ALTER TABLE cart_items DISABLE ROW LEVEL SECURITY;

-- Disable RLS on wishlist_items
ALTER TABLE wishlist_items DISABLE ROW LEVEL SECURITY;
