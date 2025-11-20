import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Lock, Code, Globe, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import usePageTitle from "@/hooks/usePageTitle";
import useMetaDescription from "@/hooks/useMetaDescription";

const Services = () => {
  usePageTitle("Our Services | Cybersecurity & Tech Solutions | Cyber Dhators");
  useMetaDescription("Explore Cyber Dhators' comprehensive services: cybersecurity solutions, threat detection, tech innovation, training, consulting, and digital transformation for businesses.");
  const services = [
    {
      icon: Shield,
      title: "Cybersecurity & Threat Detection",
      description: "Comprehensive security solutions to protect your organization from cyber threats. Real-time monitoring, threat intelligence, and incident response.",
      features: [
        "24/7 Security Monitoring",
        "Threat Intelligence & Analysis",
        "Incident Response & Recovery",
        "Security Audits & Compliance"
      ]
    },
    {
      icon: Search,
      title: "Ethical Hacking & Penetration Testing",
      description: "Professional penetration testing services to identify vulnerabilities before malicious actors do.",
      features: [
        "Web Application Testing",
        "Network Security Assessment",
        "Social Engineering Testing",
        "Detailed Security Reports"
      ]
    },
    {
      icon: Lock,
      title: "Network Security Solutions",
      description: "Enterprise-grade network security infrastructure to safeguard your digital assets.",
      features: [
        "Firewall Configuration",
        "VPN Setup & Management",
        "Access Control Systems",
        "Network Monitoring Tools"
      ]
    },
    {
      icon: Code,
      title: "Web & App Development",
      description: "Custom web and mobile applications built with security and scalability in mind.",
      features: [
        "Responsive Web Design",
        "Mobile App Development",
        "E-commerce Solutions",
        "API Integration Services"
      ]
    },
    {
      icon: BookOpen,
      title: "Tech Training & Digital Literacy",
      description: "Comprehensive training programs to build cybersecurity awareness and technical skills.",
      features: [
        "Cybersecurity Awareness",
        "Coding Bootcamps",
        "Digital Skills Training",
        "Corporate Workshop"
      ]
    },
    {
      icon: Globe,
      title: "Consulting & Strategy",
      description: "Strategic technology consulting to help organizations navigate digital transformation securely.",
      features: [
        "IT Strategy Planning",
        "Security Policy Development",
        "Compliance Consulting",
        "Digital Transformation"
      ]
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
              <span className="cyber-gradient">Our Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive cybersecurity and technology solutions tailored for African businesses
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
              >
                <service.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 border border-primary/20 text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's discuss how we can tailor our services to meet your specific needs
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;