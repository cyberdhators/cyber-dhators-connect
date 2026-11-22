import { Suspense, lazy, type ComponentType } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogNew from "./pages/BlogNew";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import ProjectNew from "./pages/ProjectNew";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import ProjectDetail from "./pages/ProjectDetail";
import ReportThreatButton from "./components/ReportThreatButton";
import { PUBLIC_PAGES, type PublicPath } from "./config/site";

const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

const queryClient = new QueryClient();

// Every public page in src/config/site.ts must have a component here (enforced by the type),
// which keeps the router, sitemap.xml and the Worker in sync.
const PUBLIC_PAGE_COMPONENTS: Record<PublicPath, ComponentType> = {
  "/": Home,
  "/about": About,
  "/services": Services,
  "/products": Products,
  "/blog": Blog,
  "/projects": Projects,
  "/team": Team,
  "/gallery": Gallery,
  "/testimonials": Testimonials,
  "/contact": Contact,
};

const pageFallback = <div className="min-h-screen bg-background" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {PUBLIC_PAGES.map(({ path }) => {
            const Page = PUBLIC_PAGE_COMPONENTS[path];
            return (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={pageFallback}>
                    <Page />
                  </Suspense>
                }
              />
            );
          })}
          <Route path="/blog/new" element={<BlogNew />} />
          <Route path="/blog/edit/:id" element={<BlogNew />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects/new" element={<ProjectNew />} />
          <Route path="/projects/edit/:id" element={<ProjectNew />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route
            path="/products/:slug"
            element={
              <Suspense fallback={pageFallback}>
                <ProductDetail />
              </Suspense>
            }
          />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ReportThreatButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;