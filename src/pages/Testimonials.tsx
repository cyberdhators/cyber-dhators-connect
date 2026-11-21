import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import usePageTitle from "@/hooks/usePageTitle";
import useMetaDescription from "@/hooks/useMetaDescription";
import gardinerLogo from "@/assets/gardiner-consulting.webp.asset.json";
import marylandLogo from "@/assets/maryland-county-association-minnesota.webp.asset.json";
import idwpLogo from "@/assets/international-development-water-project.webp.asset.json";
import corwadoLogo from "@/assets/corwado.webp.asset.json";
import fatimaLogo from "@/assets/our-lady-of-fatima-alumni.webp.asset.json";

interface OrganizationSpotlight {
  name: string;
  acronym?: string;
  focus: string;
  description: string;
  logo: string;
}

const organizations: OrganizationSpotlight[] = [
  {
    name: "Gardiner Consulting Services",
    focus: "Consulting & strategy",
    description:
      "Sound consulting brings clarity to complex decisions, helping teams plan responsibly and move forward with purpose.",
    logo: gardinerLogo.url,
  },
  {
    name: "Maryland County Association of Minnesota",
    acronym: "MCAM",
    focus: "Community & diaspora",
    description:
      "Community associations help people stay connected across distance and strengthen the relationships that sustain shared progress.",
    logo: marylandLogo.url,
  },
  {
    name: "International Development Water Project",
    acronym: "IDWP",
    focus: "Water & development",
    description:
      "Water access and community-led development are closely linked to public health, resilience, and opportunity.",
    logo: idwpLogo.url,
  },
  {
    name: "Consortium of Rural Women for Agribusiness Development Organization",
    acronym: "CORWADO",
    focus: "Women & agribusiness",
    description:
      "Supporting rural women in agribusiness can expand livelihoods, local expertise, and economic opportunity.",
    logo: corwadoLogo.url,
  },
  {
    name: "Our Lady of Fatima High School Alumni Association",
    focus: "Education & alumni",
    description:
      "Alumni communities carry a school's legacy forward by keeping relationships strong and encouraging future generations.",
    logo: fatimaLogo.url,
  },
];

const Testimonials = () => {
  usePageTitle("Organization Spotlights | Cyber Dhators");
  useMetaDescription(
    "Explore organizations across consulting, community development, water access, agribusiness, and education through Cyber Dhators' community spotlights."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Organizations <span className="cyber-gradient">&amp; Communities</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A look at organizations whose work strengthens communities, opportunity, and connection.
            </p>
          </header>

          <p className="max-w-3xl mx-auto mb-12 border-l-2 border-primary pl-4 text-sm text-muted-foreground">
            Logos and names identify the organizations; all descriptions are original context copy, not quotes or endorsements.
          </p>

          <section aria-label="Organization spotlights" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p className="text-sm text-primary font-semibold mb-2">{organization.focus}</p>
                <h2 className="text-xl font-bold leading-snug mb-3">
                  {organization.name}
                  {organization.acronym && (
                    <span className="block text-muted-foreground text-sm font-medium mt-1">
                      {organization.acronym}
                    </span>
                  )}
                </h2>
                <p className="text-muted-foreground leading-relaxed">{organization.description}</p>
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