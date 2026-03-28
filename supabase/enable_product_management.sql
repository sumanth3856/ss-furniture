-- Disable RLS on products table for admin CMS access
-- Run this in Supabase SQL Editor

-- Disable RLS for products (admin can manage without auth)
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view products" ON products;
DROP POLICY IF EXISTS "Admin can modify products" ON products;

-- Create new policies for public access
CREATE POLICY "Enable public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Enable public insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable public update" ON products FOR UPDATE USING (true);
CREATE POLICY "Enable public delete" ON products FOR DELETE USING (true);
