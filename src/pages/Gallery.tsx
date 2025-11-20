import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import usePageTitle from "@/hooks/usePageTitle";
import useMetaDescription from "@/hooks/useMetaDescription";

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const Gallery = () => {
  usePageTitle("Gallery | Cyber Dhators - Projects & Team Highlights");
  useMetaDescription("Explore Cyber Dhators gallery featuring our projects, team moments, and cybersecurity solutions. See our work in action and meet the team behind innovation.");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Gallery images - Add more images here as needed
  const galleryImages: GalleryImage[] = [];

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1;
    setSelectedImage(galleryImages[newIndex]);
    setSelectedIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1;
    setSelectedImage(galleryImages[newIndex]);
    setSelectedIndex(newIndex);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  const categories = Array.from(new Set(galleryImages.map((img) => img.category)));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="cyber-gradient">Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore highlights from our team, projects, events, and workspace. Click any image to view it in full detail.
            </p>
          </div>

          {/* Gallery Grid */}
          {galleryImages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {galleryImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="group relative overflow-hidden rounded-lg cursor-pointer h-64"
                    onClick={() => openLightbox(image, index)}
                  >
                    {/* Image */}
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-end justify-end p-4">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-right">
                        <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                        <p className="text-sm text-gray-200 line-clamp-2">{image.description}</p>
                        <span className="inline-block mt-2 text-xs bg-primary px-2 py-1 rounded">
                          {image.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Categories Info */}
              <div className="text-center text-muted-foreground">
                <p>
                  Explore {galleryImages.length} images across{" "}
                  <span className="text-foreground font-semibold">{categories.length}</span> categories
                </p>
              </div>
            </>
          ) : (
            <div className="bg-muted/30 border border-border rounded-xl p-16 text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">Gallery Coming Soon</h3>
              <p className="text-lg text-muted-foreground mb-4">
                We're currently building our gallery with images from our team, projects, and events.
              </p>
              <p className="text-muted-foreground">
                Check back soon to see highlights of our work and accomplishments!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Main Image Container */}
          <div className="flex items-center justify-center gap-4 w-full h-full max-h-96" onClick={(e) => e.stopPropagation()}>
            {/* Previous Button */}
            <button
              className="hidden md:flex text-white hover:text-primary transition-colors hover:scale-110"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-12 w-12" />
            </button>

            {/* Image */}
            <div className="flex flex-col items-center gap-4 max-w-4xl">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-96 max-w-full object-contain rounded-lg"
              />
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-gray-300 mb-2">{selectedImage.description}</p>
                <span className="inline-block text-sm bg-primary px-3 py-1 rounded">
                  {selectedImage.category}
                </span>
              </div>
            </div>

            {/* Next Button */}
            <button
              className="hidden md:flex text-white hover:text-primary transition-colors hover:scale-110"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-12 w-12" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {selectedIndex + 1} / {galleryImages.length}
          </div>

          {/* Mobile Navigation */}
          <div className="absolute bottom-4 left-4 right-4 md:hidden flex gap-2 justify-center">
            <button
              className="bg-primary/80 hover:bg-primary text-white px-4 py-2 rounded transition-colors"
              onClick={goToPrevious}
            >
              ← Previous
            </button>
            <button
              className="bg-primary/80 hover:bg-primary text-white px-4 py-2 rounded transition-colors"
              onClick={goToNext}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
