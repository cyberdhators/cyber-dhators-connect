import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ProductScreenshot } from "@/types/product";

interface LightboxProps {
  screenshots: ProductScreenshot[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const Lightbox = ({ screenshots, index, onIndexChange, onClose }: LightboxProps) => {
  const total = screenshots.length;
  const screenshot = screenshots[index];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        onIndexChange((index - 1 + total) % total);
      } else if (event.key === "ArrowRight") {
        onIndexChange((index + 1) % total);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, total, onIndexChange]);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-fit border-none bg-transparent p-0 shadow-none flex items-center justify-center">
        <DialogTitle className="sr-only">{screenshot.alt}</DialogTitle>
        <img
          src={screenshot.url}
          alt={screenshot.alt}
          className="max-w-[95vw] max-h-[90vh] rounded-lg object-contain"
        />
        {total > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 hover:text-white"
              onClick={() => onIndexChange((index - 1 + total) % total)}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 hover:text-white"
              onClick={() => onIndexChange((index + 1) % total)}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
              {index + 1} / {total}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Lightbox;
