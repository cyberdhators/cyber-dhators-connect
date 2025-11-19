import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";
import monkonmlahImage from "@/assets/monkonmlah-poure.png";
import alieuImage from "@/assets/alieu-keita.png";
import samuelImage from "@/assets/samuel-nimely.png";
import oliverImage from "@/assets/Oliver-d-jerry-jr.png";
import lormelImage from "@/assets/lormel-walter-banks.png";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "founder" | "team";
  bio: string;
  image: string;
  email?: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

const Team = () => {
  const teamMembers: TeamMember[] = [
    {
      id: "monkonmlah",
      name: "Monkonmlah Darlington Poure",
      role: "Co-Founder",
      category: "founder",
      bio: "Aspiring cybersecurity professional dedicated to building secure, innovative technologies that protect and empower digital communities. Passionate about driving digital trust and resilience in an increasingly connected world.",
      image: monkonmlahImage,
      email: "monkonmlah@cyberdhators.codes",
      social: {
        linkedin: "https://www.linkedin.com/in/monkonmlah-darlington-poure/",
        twitter: "https://twitter.com/",
      },
    },
    {
      id: "alieu",
      name: "Alieu S Keita",
      role: "Co-Founder",
      category: "founder",
      bio: "A creative, purpose-driven individual passionate about building meaningful digital experiences and empowering communities through innovation. Dedicated to using technology, design, and collaboration to create lasting impact.",
      image: alieuImage,
      email: "alieu@cyberdhators.codes",
      social: {
        linkedin: "https://www.linkedin.com/in/alieu-keita/",
        twitter: "https://twitter.com/",
      },
    },
    {
      id: "010",
      name: "Samuel Nimely",
      role: "Member",
      category: "team",
      bio: "I'm a Liberian student currently studying IT in India, with a strong passion for computer networking. I also have skills in content creation and media, and I enjoy using creativity to communicate and connect with others. I'm always open to collaborating and working with people on meaningful projects.",
      image: samuelImage,
      email: "samuelknimelyjr@gmail.com",
      social: {
        linkedin: "https://www.linkedin.com/in/samuel-nimely-4057222a4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        github: "https://github.com/jx89gwpkbb-spec",
      },
    },
    {
      id: "011",
      name: "Oliver D Jarry Jr",
      role: "Member",
      category: "team",
      bio: "I'm a Liberian student studying at Starz university, Database Administration with strong passion for cybersecurity and digital forensic.",
      image: oliverImage,
      email: "email@cyberdhators.codes",
      social: {
        linkedin: "https://linkedin.com/in/...",
        github: "https://github.com/...",
      },
    },
    {
      id: "009",
      name: "Lormel Walter Banks",
      role: "Member",
      category: "team",
      bio: "Graduate of Information Technology from Graphic Era University, with a passion for software development. Eager to contribute my skills and knowledge to innovative projects that drive digital transformation.",
      image: lormelImage,
      email: "lormal.banks@gmail.com",
      social: {
        linkedin: "https://linkedin.com/in/...",
        github: "https://github.com/lormelbanks-sudo/",
      },
    },
    
    // Add more team members here as needed
    // {
    //   id: "team-member-1",
    //   name: "Team Member Name",
    //   role: "Position/Title",
    //   category: "team",
    //   bio: "Brief bio describing their role and expertise",
    //   image: "/path/to/image.png",
    //   email: "email@cyberdhators.codes",
    //   social: {
    //     linkedin: "https://www.linkedin.com/in/...",
    //     github: "https://github.com/...",
    //   },
    // },
  ];

  const founders = teamMembers.filter((m) => m.category === "founder");
  const team = teamMembers.filter((m) => m.category === "team");

  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <div className="group">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {/* Social Icons Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="bg-white text-black p-3 rounded-full hover:bg-primary hover:text-white transition-colors"
              title="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          )}
          {member.social?.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {member.social?.github && (
            <a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-3 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
              title="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {member.social?.twitter && (
            <a
              href={member.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-3 rounded-full hover:bg-blue-400 hover:text-white transition-colors"
              title="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
      <p className="text-sm text-primary font-semibold mb-3">{member.role}</p>
      <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
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
              Meet Our <span className="cyber-gradient">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the talented minds behind Cyber Dhators. Our team is dedicated to innovation,
              security, and creating meaningful impact across Africa and beyond.
            </p>
          </div>

          {/* Founders Section */}
          {founders.length > 0 && (
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-2">Founders</h2>
                <p className="text-muted-foreground">
                  The visionaries leading Cyber Dhators
                </p>
              </div>
              <div className="flex justify-center gap-8 mb-20">
                {founders.map((member) => (
                  <div
                    key={member.id}
                    className="bg-gradient-to-br from-primary/5 to-background border border-primary/20 rounded-xl p-8 hover:border-primary/40 transition-all max-w-sm"
                  >
                    <TeamMemberCard member={member} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Team Members Section */}
          {team.length > 0 && (
            <section>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Core Team</h2>
                <p className="text-sm text-muted-foreground">
                  The experts making it all possible
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className="bg-card border border-border rounded-lg p-4 hover:border-secondary/40 transition-all hover:shadow-lg hover:shadow-secondary/10"
                  >
                    <div className="group">
                      <div className="relative overflow-hidden rounded-lg mb-3">
                        <div className="aspect-square overflow-hidden bg-muted">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {/* Social Icons Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="bg-white text-black p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                              title="Email"
                            >
                              <Mail className="h-4 w-4" />
                            </a>
                          )}
                          {member.social?.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white text-black p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                              title="LinkedIn"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                          {member.social?.github && (
                            <a
                              href={member.social.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white text-black p-2 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
                              title="GitHub"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                      <h3 className="text-sm font-bold mb-0.5 line-clamp-2">{member.name}</h3>
                      <p className="text-xs text-primary font-semibold mb-2">{member.role}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Empty State for Additional Team Members */}
          {team.length === 0 && (
            <section className="text-center py-12">
              <div className="bg-muted/30 border border-border rounded-xl p-12">
                <p className="text-muted-foreground mb-4">
                  More team members coming soon! We're growing our team to better serve you.
                </p>
                <p className="text-sm text-muted-foreground">
                  Check back soon to see who joins us on this journey.
                </p>
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Team;
