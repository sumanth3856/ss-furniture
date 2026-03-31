-- Performance Indexes for SS Furniture
-- Run this in Supabase SQL Editor

-- Products table indexes for search and filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Cart items indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_product ON cart_items(user_id, product_id);

-- Wishlist items indexes
CREATE INDEX IF NOT EXISTS idx_wishlist_items_user_id ON wishlist_items(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_user_product ON wishlist_items(user_id, product_id);

-- Full text search index for products (optional, for better search performance)
CREATE INDEX IF NOT EXISTS idx_products_name_search ON products USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- Verify indexes
SELECT indexname, indexdef FROM pg_indexes WHERE tablename IN ('products', 'cart_items', 'wishlist_items');
