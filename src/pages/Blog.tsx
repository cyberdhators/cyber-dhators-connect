import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, User, Edit, Plus } from "lucide-react";
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

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    fetchPosts();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
  };

  const fetchPosts = async () => {
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
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data as any || []);
    } catch (error: any) {
      toast({
        title: "Error loading posts",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero */}
          <div className="flex justify-between items-center mb-16">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="cyber-gradient">Cyber Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Latest in cybersecurity and digital innovation
              </p>
            </div>
            {user && (
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/blog/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Link>
              </Button>
            )}
          </div>

          {/* Blog Posts Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet. Be the first to share!</p>
              {user && (
                <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/blog/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Post
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary">
                        {post.category || "General"}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.profiles?.full_name || "Anonymous"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Link to={`/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!user && (
            <div className="mt-12 text-center bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Want to Share Your Knowledge?</h3>
              <p className="text-muted-foreground mb-6">
                Sign in to create and publish your own cybersecurity articles
              </p>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/auth">Sign In to Post</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;