import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_id: string;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
}

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      setPost(data as any);
    } catch (error: any) {
      toast({
        title: "Error loading post",
        description: error.message,
        variant: "destructive",
      });
      navigate("/blog");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-muted-foreground">Post not found</p>
            <Button asChild className="mt-4">
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>

          {post.category && (
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              {post.category}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.profiles?.full_name || "Anonymous"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-8 italic">
              {post.excerpt}
            </p>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {post.content}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
