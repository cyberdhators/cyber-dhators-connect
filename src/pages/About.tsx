import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Target, Heart, Lock } from "lucide-react";
import monkonmlahImage from "@/assets/monkonmlah-poure.png";
import alieuImage from "@/assets/alieu-keita.png";
import usePageTitle from "@/hooks/usePageTitle";
import useMetaDescription from "@/hooks/useMetaDescription";

const About = () => {
  usePageTitle("About Us | Cyber Dhators - Our Mission & Founders");
  useMetaDescription("Learn about Cyber Dhators' mission to create secure, innovative tech solutions. Meet our founders and discover our core values of innovation, integrity, and security.");
  const values = [
    {
      icon: Shield,
      title: "Innovation",
      description: "We design creative solutions to real problems"
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "We build with honesty, trust, and accountability"
    },
    {
      icon: Target,
      title: "Inclusion",
      description: "We believe technology should empower everyone"
    },
    {
      icon: Lock,
      title: "Security",
      description: "We prioritize safety and data protection in all we do"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="cyber-gradient">About</span> Cyber Dhators
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The Love of Tech Brought Us Here
            </p>
          </div>

          {/* Who We Are */}
          <section className="mb-20">
            <div className="bg-card border border-border rounded-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-primary">Who We Are</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                Cyber Dhators is a Liberian-based technology organization founded by <span className="text-foreground font-semibold">Monkonmlah Darlington Poure</span> and <span className="text-foreground font-semibold">Alieu S Keita</span>. Our mission is to design and deliver innovative tech products and services that address real-world challenges, empower communities, and shape the future of digital innovation across Africa.
              </p>
              
              {/* Founders */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-primary/5 to-background border border-primary/20 rounded-xl p-8 text-center hover:border-primary/40 transition-all">
                  <div className="flex justify-center mb-4">
                    <img 
                      src={monkonmlahImage} 
                      alt="Monkonmlah Darlington Poure" 
                      className="h-32 w-32 rounded-full object-cover border-2 border-primary/30 shadow-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Monkonmlah Darlington Poure</h3>
                  <p className="text-sm text-primary font-semibold mb-3">Co-Founder</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Aspiring cybersecurity professional dedicated to building secure, innovative technologies that protect and empower digital communities. Passionate about driving digital trust and resilience in an increasingly connected world.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-secondary/5 to-background border border-secondary/20 rounded-xl p-8 text-center hover:border-secondary/40 transition-all">
                  <div className="flex justify-center mb-4">
                    <img 
                      src={alieuImage} 
                      alt="Alieu S Keita" 
                      className="h-32 w-32 rounded-full object-cover border-2 border-secondary/30 shadow-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Alieu S Keita</h3>
                  <p className="text-sm text-secondary font-semibold mb-3">Co-Founder</p>
                  <p className="text-muted-foreground leading-relaxed">
                    A creative, purpose-driven individual passionate about building meaningful digital experiences and empowering communities through innovation. Dedicated to using technology, design, and collaboration to create lasting impact.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To create sustainable tech services and products that solve meaningful problems in Liberia and the world at large.
              </p>
            </div>
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-secondary">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To make Africa a global leader in secure, smart, and inclusive technology.
              </p>
            </div>
          </section>

          {/* Core Values */}
          <section>
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
                >
                  <value.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;