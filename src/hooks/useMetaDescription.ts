import { useEffect } from "react";

const useMetaDescription = (description: string) => {
  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
    return () => {
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          "Innovative cybersecurity and tech solutions for a safer, smarter digital world. Leading technology organization based in Liberia."
        );
      }
    };
  }, [description]);
};

export default useMetaDescription;
