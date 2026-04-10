-- ============================================
-- China Steps - Supabase Database Setup SQL
-- Supabase Dashboard > SQL Editor da ishga tushiring
-- ============================================

-- 1. UNIVERSITETLAR
CREATE TABLE IF NOT EXISTS universities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  img_url TEXT DEFAULT '',
  grant_type TEXT DEFAULT 'To''liq Grant',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bitta namunaviy ma'lumot
INSERT INTO universities (name, city, img_url, grant_type)
VALUES (
  'Peking University',
  'Beijing',
  'https://images.unsplash.com/photo-1583507923701-d703770420bc?q=80&w=800&auto=format&fit=crop',
  'To''liq Grant'
);

-- 2. TARJIMONLAR
CREATE TABLE IF NOT EXISTS translators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT DEFAULT 'Online',
  img_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ARIZALAR (CRM Submissions)
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  source TEXT DEFAULT 'Veb-sayt',
  status TEXT DEFAULT 'KUTILMOQDA',
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RLS (Row Level Security) - Public o'qish, himoyalangan yozish
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE translators ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Hamma o'qiy oladi
CREATE POLICY "Public read universities" ON universities FOR SELECT USING (true);
CREATE POLICY "Public read translators" ON translators FOR SELECT USING (true);

-- Submissions faqat service role bilan yoziladi
CREATE POLICY "Anon insert submissions" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Service read submissions" ON submissions FOR SELECT USING (true);
CREATE POLICY "Service delete submissions" ON submissions FOR DELETE USING (true);

-- Universities va Translators uchun to'liq CRUD
CREATE POLICY "Anon insert universities" ON universities FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon update universities" ON universities FOR UPDATE USING (true);
CREATE POLICY "Anon delete universities" ON universities FOR DELETE USING (true);

CREATE POLICY "Anon insert translators" ON translators FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon update translators" ON translators FOR UPDATE USING (true);
CREATE POLICY "Anon delete translators" ON translators FOR DELETE USING (true);

-- 5. STORAGE BUCKET (Rasmlar uchun)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Anon upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images');

CREATE POLICY "Anon delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'images');
