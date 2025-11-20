import { useEffect } from "react";

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "Cyber Dhators - Protecting Africa's Digital Future";
    };
  }, [title]);
};

export default usePageTitle;
