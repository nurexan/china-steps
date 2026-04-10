import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface University {
  id: string;
  name: string;
  city: string;
  img_url: string;
  grant_type: string;
  created_at: string;
}

export interface Translator {
  id: string;
  name: string;
  location: string;
  status: string;
  img_url: string;
  created_at: string;
}

export interface Submission {
  id: string;
  name: string;
  phone: string;
  source: string;
  status: string;
  message: string;
  created_at: string;
}

// ===== IMAGE UPLOAD to Supabase Storage =====
export async function uploadImage(file: File, folder: string = 'uploads'): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) {
    console.error('Rasm yuklash xatosi:', error.message);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}
