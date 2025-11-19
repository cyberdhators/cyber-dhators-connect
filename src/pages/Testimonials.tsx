import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  testimonial: string;
  rating: number;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "John Smith",
      title: "CEO",
      company: "Tech Solutions Inc.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      testimonial:
        "Cyber Dhators transformed our security infrastructure. Their team's expertise and dedication helped us achieve complete digital protection. Highly recommended!",
      rating: 5,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      title: "IT Director",
      company: "Global Enterprise Corp",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      testimonial:
        "Working with Cyber Dhators was a game-changer for our organization. Their innovative solutions and proactive approach to security have exceeded our expectations.",
      rating: 5,
    },
    {
      id: "3",
      name: "Michael Chen",
      title: "Operations Manager",
      company: "StartUp Innovations",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      testimonial:
        "The team at Cyber Dhators provided exceptional support throughout our digital transformation journey. Their technical knowledge and professionalism are unmatched.",
      rating: 5,
    },
    {
      id: "4",
      name: "Emma Wilson",
      title: "Finance Manager",
      company: "Financial Services Ltd",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      testimonial:
        "Outstanding service and commitment to excellence. Cyber Dhators helped us implement robust security measures that protect our sensitive financial data.",
      rating: 5,
    },
    {
      id: "5",
      name: "David Martinez",
      title: "Project Lead",
      company: "Digital Ventures",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      testimonial:
        "From consultation to implementation, Cyber Dhators delivered exceptional results. Their solutions are scalable, secure, and perfectly aligned with our business goals.",
      rating: 5,
    },
    {
      id: "6",
      name: "Lisa Anderson",
      title: "CTO",
      company: "Tech Forward Ltd",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      testimonial:
        "Cyber Dhators is our trusted partner for all cybersecurity needs. Their proactive approach and continuous support ensure we stay ahead of threats.",
      rating: 5,
    },
  ];

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              What Our Clients <span className="cyber-gradient">Say</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from organizations we've helped secure their digital infrastructure and achieve their
              cybersecurity goals
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/50 transition-all">
              <div className="text-4xl font-bold text-primary mb-2">{testimonials.length}+</div>
              <p className="text-muted-foreground">Satisfied Clients</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/50 transition-all">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">5-Star Ratings</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/50 transition-all">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all group"
              >
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/30 mb-4 group-hover:text-primary/50 transition-colors" />

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.testimonial}"
                </p>

                {/* Divider */}
                <div className="border-t border-border pt-6 mt-6">
                  {/* Client Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let Cyber Dhators help you secure your digital infrastructure and achieve your cybersecurity goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Get Started
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3 bg-secondary/20 text-foreground border border-secondary rounded-lg hover:bg-secondary/30 transition-colors font-semibold"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Testimonials;
