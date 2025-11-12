-- Drop existing foreign keys that reference auth.users
ALTER TABLE public.blog_posts 
  DROP CONSTRAINT IF EXISTS blog_posts_author_id_fkey;

ALTER TABLE public.projects 
  DROP CONSTRAINT IF EXISTS projects_user_id_fkey;

-- Add new foreign keys referencing profiles table
ALTER TABLE public.blog_posts 
  ADD CONSTRAINT blog_posts_author_id_fkey 
  FOREIGN KEY (author_id) 
  REFERENCES public.profiles(id) 
  ON DELETE CASCADE;

ALTER TABLE public.projects 
  ADD CONSTRAINT projects_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES public.profiles(id) 
  ON DELETE CASCADE;