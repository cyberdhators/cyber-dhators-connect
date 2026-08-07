import { lazy, Suspense, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { ProductScreenshot } from "@/types/product";

const Lightbox = lazy(() => import("./Lightbox"));

interface ScreenshotGalleryProps {
  screenshots: ProductScreenshot[];
  productName: string;
}

const ScreenshotGallery = ({ screenshots, productName }: ScreenshotGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (screenshots.length === 0) return null;

  return (
    <>
      <Carousel opts={{ align: "start" }} className="w-full" aria-label={`${productName} screenshots`}>
        <CarouselContent>
          {screenshots.map((screenshot, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View screenshot: ${screenshot.alt}`}
                className="block w-full overflow-hidden rounded-xl border border-border transition-all hover:border-primary/50 cursor-zoom-in"
              >
                <img
                  src={screenshot.url}
                  alt={screenshot.alt}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox
            screenshots={screenshots}
            index={lightboxIndex}
            onIndexChange={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        </Suspense>
      )}
    </>
  );
};

export default ScreenshotGallery;
