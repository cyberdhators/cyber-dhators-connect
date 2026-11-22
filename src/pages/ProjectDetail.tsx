import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, ExternalLink, Github } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import usePageSEO from "@/hooks/usePageSEO";
import { parseContentSlug, pickBySlug } from "@/lib/slug";
import { notFoundMeta, projectMeta, projectUrl, type ProjectSEO } from "@/seo/meta";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectSEO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      const ref = parseContentSlug(slug);
      let found: ProjectSEO | null = null;
      if (ref) {
        let query = supabase.from("projects").select("*");
        query = ref.kind === "id" ? query.eq("id", ref.id) : query.gte("id", ref.lower).lte("id", ref.upper);
        const { data } = await query;
        found = pickBySlug((data as ProjectSEO[]) ?? [], slug!) ?? null;
      }
      if (cancelled) return;
      setProject(found);
      setIsLoading(false);
      if (found && projectUrl(found) !== `/projects/${slug}`) {
        navigate(projectUrl(found), { replace: true });
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [slug, navigate]);

  usePageSEO(isLoading ? null : project ? projectMeta(project) : notFoundMeta);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" className="mb-6" onClick={() => navigate("/projects")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>

          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading project...</p>
          ) : !project ? (
            <div className="text-center">
              <p className="text-muted-foreground">Project not found</p>
              <Button asChild className="mt-4">
                <Link to="/projects">Browse all projects</Link>
              </Button>
            </div>
          ) : (
            <>
              {project.category && (
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm mb-4">
                  {project.category}
                </span>
              )}

              <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>

              {project.thumbnail_url && (
                <div className="aspect-video overflow-hidden rounded-lg mb-8">
                  <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-center gap-2 text-muted-foreground mb-8 pb-8 border-b border-border">
                <Calendar className="h-4 w-4" />
                <span>{new Date(project.created_at).toLocaleDateString()}</span>
              </div>

              <p className="whitespace-pre-wrap text-lg text-foreground leading-relaxed mb-10">
                {project.description}
              </p>

              {(project.github_url || project.demo_url) && (
                <div className="flex flex-wrap gap-3">
                  {project.github_url && (
                    <Button asChild variant="outline">
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  )}
                  {project.demo_url && (
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
