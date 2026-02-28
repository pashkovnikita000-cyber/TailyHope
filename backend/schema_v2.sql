-- Taily Hope Database Enhancements (V2)

-- 1. Language Support (Simple tags or JSONB for multilingual fields)
ALTER TABLE pets ADD COLUMN name_ru TEXT;
ALTER TABLE pets ADD COLUMN name_lv TEXT;
ALTER TABLE pets ADD COLUMN description_ru TEXT;
ALTER TABLE pets ADD COLUMN description_lv TEXT;

-- 2. News/Facebook Integration Table
CREATE TABLE news_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fb_post_id TEXT UNIQUE,
    content TEXT,
    image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Security: Trigger for automatic user profiles (for admins)
-- Assuming admin emails will be managed via Supabase Auth
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'shelter_manager' -- 'admin', 'shelter_manager'
);

-- Enable RLS
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view news" ON news_posts FOR SELECT USING (true);
CREATE POLICY "Admins can manage news" ON news_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
