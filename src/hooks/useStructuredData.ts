import { useEffect } from "react";

interface StructuredDataProps {
  title: string;
  description: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  url: string;
}

const useStructuredData = ({
  title,
  description,
  image,
  author,
  datePublished,
  dateModified,
  url,
}: StructuredDataProps) => {
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: description,
      image: image || "https://cyberdhators.codes/cd-logo.png",
      author: {
        "@type": "Person",
        name: author || "Cyber Dhators",
      },
      datePublished: datePublished || new Date().toISOString(),
      dateModified: dateModified || new Date().toISOString(),
      publisher: {
        "@type": "Organization",
        name: "Cyber Dhators",
        logo: {
          "@type": "ImageObject",
          url: "https://cyberdhators.codes/cd-logo.png",
        },
      },
      url: url,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [title, description, image, author, datePublished, dateModified, url]);
};

export default useStructuredData;
