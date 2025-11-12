-- Add featured_image_url column to blog_posts
ALTER TABLE public.blog_posts
ADD COLUMN featured_image_url text;

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('blog-images', 'blog-images', true),
  ('project-thumbnails', 'project-thumbnails', true);

-- RLS policies for blog-images bucket
CREATE POLICY "Blog images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own blog images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'blog-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own blog images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS policies for project-thumbnails bucket
CREATE POLICY "Project thumbnails are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-thumbnails');

CREATE POLICY "Authenticated users can upload project thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-thumbnails' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own project thumbnails"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'project-thumbnails' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own project thumbnails"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-thumbnails' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);