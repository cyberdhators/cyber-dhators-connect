import { Link, useParams } from "react-router-dom";
import { Mail, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useProductSEO from "@/hooks/useProductSEO";
import ProductBreadcrumb from "@/components/products/ProductBreadcrumb";
import ProductHero from "@/components/products/ProductHero";
import FeatureGrid from "@/components/products/FeatureGrid";
import ScreenshotGallery from "@/components/products/ScreenshotGallery";
import RequirementCard from "@/components/products/RequirementCard";
import DownloadGrid from "@/components/products/DownloadGrid";
import Changelog from "@/components/products/Changelog";
import FAQAccordion from "@/components/products/FAQAccordion";
import ReviewCard from "@/components/products/ReviewCard";
import RelatedProducts from "@/components/products/RelatedProducts";
import { getProductBySlug, getRelatedProducts } from "@/data/products";

const DOCUMENTATION_LABELS: Record<string, string> = {
  userGuide: "User Guide",
  apiDocs: "API Documentation",
  installationGuide: "Installation Guide",
  releaseNotes: "Release Notes",
  developerDocs: "Developer Docs",
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug ?? "");

  useProductSEO(product);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-muted-foreground">Product not found</p>
            <Button asChild className="mt-4">
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const related = getRelatedProducts(product, 3);

  const requirementTabs: Array<{ key: string; label: string; content: JSX.Element }> = [];
  const { windows, macos, android, ios } = product.systemRequirements;

  if (windows) {
    requirementTabs.push({
      key: "windows",
      label: "Windows",
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          <RequirementCard title="Minimum" items={windows.minimum} />
          {windows.recommended && <RequirementCard title="Recommended" items={windows.recommended} />}
        </div>
      ),
    });
  }
  if (macos) {
    const generalItems = [
      macos.os && `OS: ${macos.os}`,
      macos.minRam && `RAM: ${macos.minRam}`,
      macos.storage && `Storage: ${macos.storage}`,
    ].filter((item): item is string => Boolean(item));

    requirementTabs.push({
      key: "macos",
      label: "macOS",
      content: (
        <div className="grid sm:grid-cols-2 gap-4">
          {macos.intel && <RequirementCard title="Intel" items={macos.intel} />}
          {macos.appleSilicon && <RequirementCard title="Apple Silicon" items={macos.appleSilicon} />}
          {generalItems.length > 0 && <RequirementCard title="General" items={generalItems} />}
        </div>
      ),
    });
  }
  if (android) {
    requirementTabs.push({
      key: "android",
      label: "Android",
      content: (
        <RequirementCard
          title="Requirements"
          items={[`Minimum Android version: ${android.minVersion}`, `Storage: ${android.storage}`]}
        />
      ),
    });
  }
  if (ios) {
    requirementTabs.push({
      key: "ios",
      label: "iOS",
      content: (
        <RequirementCard
          title="Requirements"
          items={[`Minimum iOS version: ${ios.minVersion}`, `Storage: ${ios.storage}`]}
        />
      ),
    });
  }

  const documentationEntries = product.documentation
    ? (Object.entries(product.documentation).filter(([, url]) => Boolean(url)) as [string, string][])
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <ProductBreadcrumb productName={product.name} />
          <ProductHero product={product} />

          {/* About */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">About {product.name}</h2>
            <div className="space-y-4 text-muted-foreground max-w-3xl mb-6">
              {product.longDescription.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            {product.whoItsFor && (
              <p className="mb-2">
                <span className="font-semibold text-foreground">Who it's for: </span>
                <span className="text-muted-foreground">{product.whoItsFor}</span>
              </p>
            )}
            {product.useCases && product.useCases.length > 0 && (
              <ul className="space-y-2 mt-4">
                {product.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 shrink-0" />
                    {useCase}
                  </li>
                ))}
              </ul>
            )}
            {product.businessValue && (
              <p className="mt-4 text-muted-foreground max-w-3xl">
                <span className="font-semibold text-foreground">Business value: </span>
                {product.businessValue}
              </p>
            )}
          </section>

          {/* Key Features */}
          {product.features.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <FeatureGrid features={product.features} />
            </section>
          )}

          {/* Screenshots */}
          {product.screenshots.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
              <ScreenshotGallery screenshots={product.screenshots} productName={product.name} />
            </section>
          )}

          {/* Video Demo */}
          {product.video && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Watch a Demo</h2>
              <div className="aspect-video rounded-xl overflow-hidden border border-border">
                <iframe
                  src={product.video}
                  title={`${product.name} demo video`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </section>
          )}

          {/* System Requirements */}
          {requirementTabs.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">System Requirements</h2>
              <Tabs defaultValue={requirementTabs[0].key}>
                <TabsList>
                  {requirementTabs.map((tab) => (
                    <TabsTrigger key={tab.key} value={tab.key}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {requirementTabs.map((tab) => (
                  <TabsContent key={tab.key} value={tab.key} className="mt-6">
                    {tab.content}
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          )}

          {/* Downloads */}
          <section id="downloads" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Downloads</h2>
            <DownloadGrid downloads={product.downloads} />
          </section>

          {/* Changelog */}
          {product.changelog.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Changelog</h2>
              <Changelog entries={product.changelog} />
            </section>
          )}

          {/* FAQ */}
          {product.faq.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <FAQAccordion items={product.faq} />
            </section>
          )}

          {/* Reviews */}
          {product.reviews.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">What Users Say</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>
          )}

          {/* Documentation */}
          {documentationEntries.length > 0 && (
            <section id="documentation" className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Documentation</h2>
              <div className="flex flex-wrap gap-3">
                {documentationEntries.map(([key, url]) => (
                  <Button key={key} variant="outline" asChild>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {DOCUMENTATION_LABELS[key] ?? key}
                    </a>
                  </Button>
                ))}
              </div>
            </section>
          )}

          {/* Need Help / Contact */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Need Help?</h2>
            <div className="flex flex-wrap gap-3">
              {product.supportEmail && (
                <Button asChild>
                  <a href={`mailto:${product.supportEmail}?subject=${encodeURIComponent(`Support: ${product.name}`)}`}>
                    <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                    Email Support
                  </a>
                </Button>
              )}
              {product.whatsapp && (
                <Button variant="outline" asChild>
                  <a href={product.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </section>

          <RelatedProducts products={related} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
