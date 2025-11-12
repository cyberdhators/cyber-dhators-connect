import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Code, Users, ArrowRight, Zap, Globe, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "Advanced Security",
      description: "State-of-the-art cybersecurity solutions protecting your digital assets 24/7"
    },
    {
      icon: Code,
      title: "Tech Innovation",
      description: "Cutting-edge technology products designed for African market needs"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Empowering communities through digital literacy and tech training"
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "World-class security practices adapted for local contexts"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="cyber-gradient">Protecting Africa's</span>
              <br />
              <span className="text-foreground">Digital Future</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Innovative cybersecurity and tech solutions for a safer, smarter digital world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                <Link to="/services">
                  Get Protected
                  <Shield className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground group">
                <Link to="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground mt-2">Clients Protected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary">24/7</div>
              <div className="text-sm text-muted-foreground mt-2">Security Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground mt-2">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary">99.9%</div>
              <div className="text-sm text-muted-foreground mt-2">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-cyber-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Cyber Dhators?</h2>
            <p className="text-muted-foreground text-lg">Leading the way in African cybersecurity innovation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 border border-primary/20">
            <Lock className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-glow" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Digital Future?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join hundreds of organizations trusting Cyber Dhators for their cybersecurity needs
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contact">
                Get Started Today
                <Zap className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;