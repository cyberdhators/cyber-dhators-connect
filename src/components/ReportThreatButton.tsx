import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ReportThreatButton = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    threatType: "",
    description: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Threat Report Received",
      description: "Our security team will review your report immediately.",
    });
    setFormData({ email: "", threatType: "", description: "" });
    setOpen(false);
  };

  // Allow opening the dialog from other parts of the app by dispatching
  // a window event: window.dispatchEvent(new Event('open-report-dialog'))
  // This lets the header button open the same dialog without adding a route.
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-report-dialog", handler as EventListener);
    return () => window.removeEventListener("open-report-dialog", handler as EventListener);
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all"
          >
            <Shield className="h-6 w-6 animate-pulse-glow" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Report a Cyber Threat
            </DialogTitle>
            <DialogDescription>
              Help us protect the community by reporting suspicious activity or security threats.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="threatType">Threat Type</Label>
              <Input
                id="threatType"
                placeholder="e.g., Phishing, Malware, Data Breach"
                value={formData.threatType}
                onChange={(e) => setFormData({ ...formData, threatType: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the threat in detail..."
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Submit Report
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportThreatButton;