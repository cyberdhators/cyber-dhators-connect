import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { usePublicPageSEO } from "@/hooks/usePageSEO";
import gardinerLogo from "@/assets/gardiner-consulting.webp.asset.json";
import marylandLogo from "@/assets/maryland-county-association-minnesota.webp.asset.json";
import idwpLogo from "@/assets/international-development-water-project.webp.asset.json";
import corwadoLogo from "@/assets/corwado.webp.asset.json";
import fatimaLogo from "@/assets/our-lady-of-fatima-alumni.webp.asset.json";

interface OrganizationSpotlight {
  name: string;
  acronym?: string;
  focus: string;
  quote: string;
  rating: number;
  logo: string;
}

const organizations: OrganizationSpotlight[] = [
  {
    name: "Gardiner Consulting Services",
    focus: "Consulting & strategy",
    quote:
      "Working with the team on our website was a smooth experience. They helped us present Gardiner Consulting Services online with a professional, easy-to-navigate site.",
    rating: 5,
    logo: gardinerLogo.url,
  },
  {
    name: "Minnesota County Association",
    acronym: "MCAM",
    focus: "Community & diaspora",
    quote:
      "The team helped us create a website that gives our association a clear online presence and makes it easier to share information about our work.",
    rating: 5,
    logo: marylandLogo.url,
  },
  {
    name: "International Development Water Project",
    acronym: "IDWP",
    focus: "Water & development",
    quote:
      "Our website helps us communicate IDWP's mission and share information about our work. The team was helpful throughout the project.",
    rating: 5,
    logo: idwpLogo.url,
  },
  {
    name: "CORWADO",
    focus: "Women & agribusiness",
    quote:
      "The team built an application for CORWADO and developed a website to introduce our organization and its work. We appreciate their support in strengthening our digital presence.",
    rating: 5,
    logo: corwadoLogo.url,
  },
  {
    name: "Our Lady of Fatima High School Alumni Association",
    focus: "Education & alumni",
    quote:
      "The team created a website for our alumni association that helps us share updates and stay connected with our community. We appreciate their work and support.",
    rating: 5,
    logo: fatimaLogo.url,
  },
];

const Testimonials = () => {
  usePublicPageSEO("/testimonials");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              What Our <span className="cyber-gradient">Clients Say</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from the organizations we've helped build a stronger digital presence.
            </p>
          </header>

          <section aria-label="Client testimonials" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((organization) => (
              <article
                key={organization.acronym ?? organization.name}
                className="bg-card border border-border rounded-lg p-6 flex flex-col"
              >
                <div className="h-32 w-full rounded-md border border-border bg-background p-3 flex items-center justify-center mb-5">
                  <img
                    src={organization.logo}
                    alt={`${organization.name} logo`}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div
                  className="flex items-center gap-0.5 mb-3"
                  role="img"
                  aria-label={`${organization.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={
                        idx < organization.rating
                          ? "h-4 w-4 fill-primary text-primary"
                          : "h-4 w-4 text-muted-foreground"
                      }
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-5 flex-1">
                  &ldquo;{organization.quote}&rdquo;
                </p>
                <p className="text-sm text-primary font-semibold mb-1">{organization.focus}</p>
                <h2 className="text-lg font-bold leading-snug">
                  {organization.name}
                  {organization.acronym && (
                    <span className="block text-muted-foreground text-sm font-medium mt-1">
                      {organization.acronym}
                    </span>
                  )}
                </h2>
              </article>
            ))}
          </section>

          <section className="mt-20 border-t border-border pt-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Building a safer, more connected digital future</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tell us about your organization and the technology challenges you are working to solve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/contact">Contact Our Team</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;