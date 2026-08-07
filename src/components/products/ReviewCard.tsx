import { Star } from "lucide-react";
import type { ProductReview } from "@/types/product";

interface ReviewCardProps {
  review: ProductReview;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const ReviewCard = ({ review }: ReviewCardProps) => (
  <div className="bg-card border border-border rounded-xl p-6">
    <div className="flex items-center gap-3 mb-4">
      {review.avatar ? (
        <img
          src={review.avatar}
          alt={review.user}
          loading="lazy"
          className="h-10 w-10 rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm shrink-0">
          {getInitials(review.user)}
        </div>
      )}
      <div>
        <p className="font-semibold text-sm">{review.user}</p>
        <p className="text-xs text-muted-foreground">{review.country}</p>
      </div>
    </div>

    <div className="flex items-center gap-0.5 mb-3" role="img" aria-label={`${review.rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={
            idx < Math.round(review.rating)
              ? "h-4 w-4 fill-primary text-primary"
              : "h-4 w-4 text-muted-foreground"
          }
          aria-hidden="true"
        />
      ))}
    </div>

    <p className="text-sm text-muted-foreground">{review.review}</p>
    {review.date && (
      <p className="text-xs text-muted-foreground mt-3">{new Date(review.date).toLocaleDateString()}</p>
    )}
  </div>
);

export default ReviewCard;
