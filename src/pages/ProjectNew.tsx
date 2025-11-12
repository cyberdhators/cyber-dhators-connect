import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X } from "lucide-react";

const ProjectNew = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    github_url: "",
    demo_url: "",
    thumbnail_url: "",
  });

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (!data) {
        toast({
          title: "Access denied",
          description: "Only admins can create/edit projects",
          variant: "destructive",
        });
        navigate("/projects");
        return;
      }

      setIsChecking(false);
    };

    checkAdmin();
  }, [navigate, toast]);

  useEffect(() => {
    if (id && !isChecking) {
      fetchProject();
    }
  }, [id, isChecking]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      
      setFormData({
        title: data.title,
        description: data.description,
        category: data.category || "",
        github_url: data.github_url || "",
        demo_url: data.demo_url || "",
        thumbnail_url: data.thumbnail_url || "",
      });

      if (data.thumbnail_url) {
        setImagePreview(data.thumbnail_url);
      }
    } catch (error: any) {
      toast({
        title: "Error loading project",
        description: error.message,
        variant: "destructive",
      });
      navigate("/projects");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setThumbnail(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      let thumbnailUrl = imagePreview || formData.thumbnail_url;

      // Upload thumbnail if file is selected
      if (thumbnail) {
        const fileExt = thumbnail.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('project-thumbnails')
          .upload(fileName, thumbnail);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('project-thumbnails')
          .getPublicUrl(fileName);
        
        thumbnailUrl = publicUrl;
      }

      if (id) {
        // Update existing project
        const { error } = await supabase
          .from("projects")
          .update({
            ...formData,
            thumbnail_url: thumbnailUrl,
          })
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Success!",
          description: "Project updated successfully",
        });
      } else {
        // Create new project
        const { error } = await supabase
          .from("projects")
          .insert([
            {
              ...formData,
              thumbnail_url: thumbnailUrl,
              user_id: user.id,
              approved: false,
            },
          ]);

        if (error) throw error;

        toast({
          title: "Success!",
          description: "Your project has been submitted",
        });
      }
      
      navigate("/projects");
    } catch (error: any) {
      toast({
        title: `Error ${id ? 'updating' : 'submitting'} project`,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-muted-foreground">Checking permissions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/projects")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{id ? 'Edit' : 'Submit Your'} Project</CardTitle>
              <CardDescription>Share your cybersecurity project with the community</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter project title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Security Tool, Web App"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your project"
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    type="url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/username/project"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demo_url">Demo URL</Label>
                  <Input
                    id="demo_url"
                    type="url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                    placeholder="https://your-project-demo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project Thumbnail</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload an image or provide a URL
                  </p>
                  {!imagePreview ? (
                    <>
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors mb-2">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload thumbnail
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <div className="text-center text-sm text-muted-foreground mb-2">or</div>
                      <Input
                        id="thumbnail_url"
                        type="url"
                        value={formData.thumbnail_url}
                        onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                        placeholder="https://example.com/image.png"
                      />
                    </>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {!id && (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Your project will be reviewed before appearing publicly on the site.
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isLoading ? (id ? "Updating..." : "Submitting...") : (id ? "Update Project" : "Submit Project")}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate("/projects")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectNew;