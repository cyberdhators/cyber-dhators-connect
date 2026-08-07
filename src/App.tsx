import { Suspense, lazy } from "react";
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
import Sitemap from "./pages/Sitemap";
import Team from "./pages/Team";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import ReportThreatButton from "./components/ReportThreatButton";

const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/new" element={<BlogNew />} />
          <Route path="/blog/edit/:id" element={<BlogNew />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<ProjectNew />} />
          <Route path="/projects/edit/:id" element={<ProjectNew />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route
            path="/products"
            element={
              <Suspense fallback={<div className="min-h-screen bg-background" />}>
                <Products />
              </Suspense>
            }
          />
          <Route
            path="/products/:slug"
            element={
              <Suspense fallback={<div className="min-h-screen bg-background" />}>
                <ProductDetail />
              </Suspense>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ReportThreatButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;