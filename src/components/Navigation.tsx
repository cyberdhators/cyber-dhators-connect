import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Shield, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/cd-logo.png";
import ThemeToggle from "@/components/ThemeToggle";

const primaryLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/products" },
  { name: "Blog", path: "/blog" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const moreLinks = [
  { name: "Team", path: "/team" },
  { name: "Gallery", path: "/gallery" },
  { name: "Testimonials", path: "/testimonials" },
];

const allLinks = [...primaryLinks, ...moreLinks];

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const moreActive = moreLinks.some((link) => isActive(link.path));

  const linkClass = (path: string) =>
    `relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-all ${
      isActive(path)
        ? "text-primary after:bg-primary after:opacity-100"
        : "text-muted-foreground hover:text-foreground after:bg-primary after:opacity-0 hover:after:opacity-40"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src={logo} alt="Cyber Dhators" className="h-9 w-auto rounded-md" />
            <span className="hidden lg:block text-sm font-semibold tracking-wide">
              Cyber <span className="text-primary">Dhators</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {primaryLinks.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                {link.name}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors outline-none after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-all ${
                  moreActive
                    ? "text-primary after:bg-primary after:opacity-100"
                    : "text-muted-foreground hover:text-foreground after:bg-primary after:opacity-0 hover:after:opacity-40"
                }`}
              >
                More
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-40">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link
                      to={link.path}
                      className={isActive(link.path) ? "text-primary font-medium" : ""}
                    >
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button
              size="sm"
              className="rounded-full"
              onClick={() => window.dispatchEvent(new Event("open-report-dialog"))}
            >
              <Shield className="mr-2 h-4 w-4" />
              Report Threat
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-1">
              {allLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 px-4">
                <Button
                  className="w-full rounded-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new Event("open-report-dialog"));
                  }}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Report Threat
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
