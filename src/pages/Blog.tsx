import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Edit, Plus, Trash2, Search, X, ArrowUpRight, Newspaper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePublicPageSEO } from "@/hooks/usePageSEO";
import { blogPostUrl } from "@/seo/meta";
import { getErrorMessage } from "@/lib/utils";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_id: string;
  created_at: string;
  featured_image_url: string | null;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
}

const Blog = () => {
  usePublicPageSEO("/blog");
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    fetchPosts();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
    
    if (session?.user) {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();
      setIsAdmin(!!data);
    }
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
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts((data as BlogPost[]) || []);
    } catch (error) {
      toast({
        title: "Error loading posts",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", postId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      fetchPosts();
    } catch (error) {
      toast({
        title: "Error deleting post",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  const canEditPost = (post: BlogPost) => {
    return user && (isAdmin || post.author_id === user.id);
  };

  const searchTerm = search.trim().toLocaleLowerCase();
  const visiblePosts = posts.filter((post) =>
    [post.title, post.excerpt, post.category].some((value) =>
      value?.toLocaleLowerCase().includes(searchTerm),
    ),
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero */}
          <div className="flex flex-wrap justify-between items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="cyber-gradient">Cyber Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Latest in cybersecurity and digital innovation
              </p>
            </div>
            {isAdmin && (
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/blog/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Link>
              </Button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 mb-8">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {isLoading ? "Loading articles…" : `${visiblePosts.length} ${visiblePosts.length === 1 ? "article" : "articles"}`}
            </p>
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                aria-label="Search blog posts"
                placeholder="Search articles…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-9 pr-10 bg-card"
              />
              {search && (
                <Button variant="ghost" size="icon" aria-label="Clear search" onClick={() => setSearch("")} className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet.</p>
            </div>
          ) : visiblePosts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="mx-auto mb-4 h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <h2 className="text-xl mb-2">No articles found</h2>
              <p className="text-muted-foreground mb-4">No articles match “{search.trim()}”.</p>
              <Button variant="outline" onClick={() => setSearch("")}>Clear search</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePosts.map((post) => (
                <Card key={post.id} className="group flex h-[480px] min-w-0 flex-col overflow-hidden rounded-lg hover:border-primary/50 transition-colors">
                  <Link to={blogPostUrl(post)} aria-label={post.title} className="block h-48 shrink-0 overflow-hidden bg-muted">
                    {post.featured_image_url ? (
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover motion-safe:group-hover:scale-105 motion-safe:transition-transform"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-primary">
                        <Newspaper className="h-12 w-12" aria-hidden="true" />
                      </div>
                    )}
                  </Link>
                  <CardHeader className="space-y-3 px-5 pt-5 pb-0">
                    <div className="min-w-0 h-5 text-xs font-semibold uppercase text-primary">
                      <span className="block truncate" title={post.category || "General"}>
                        {post.category || "General"}
                      </span>
                    </div>
                    <CardTitle className="h-14 text-lg leading-7 group-hover:text-primary transition-colors">
                      <Link to={blogPostUrl(post)} className="line-clamp-2 break-words" title={post.title}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="h-[60px] line-clamp-3 break-words text-sm leading-5">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto px-5 pt-4 pb-5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</time>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                    <Button asChild variant="ghost" size="sm" className="mr-auto px-0 text-primary hover:bg-transparent hover:text-primary">
                      <Link to={blogPostUrl(post)}>Read More <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                    
                    {canEditPost(post) && (
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="icon" className="h-8 w-8">
                          <Link to={`/blog/edit/${post.id}`} aria-label={`Edit ${post.title}`} title="Edit post">
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon" className="h-8 w-8" aria-label={`Delete ${post.title}`} title="Delete post">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Blog Post?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the blog post.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(post.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;