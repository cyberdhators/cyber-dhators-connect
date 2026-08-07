import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FAQItem } from "@/types/product";

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion = ({ items }: FAQAccordionProps) => {
  if (items.length === 0) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, idx) => (
        <AccordionItem key={idx} value={`item-${idx}`}>
          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
