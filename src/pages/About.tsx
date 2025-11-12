import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Target, Heart, Lock } from "lucide-react";

const About = () => {
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
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cyber Dhators is a Liberian-based technology organization founded by <span className="text-foreground font-semibold">Monkonmlah Darlington Poure</span> and <span className="text-foreground font-semibold">Alieu S Keita</span>. Our mission is to design and deliver innovative tech products and services that address real-world challenges, empower communities, and shape the future of digital innovation across Africa.
              </p>
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