import { FiStar } from "react-icons/fi";

interface StarRatingProps {
  rating: number;
  count?: number;
}

export function StarRating({ rating, count }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "text-amber-400 fill-amber-400"
                : "text-default-300"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-default-500">
        {rating.toFixed(1)}
        {count ? ` (${count.toLocaleString()} reseñas)` : ""}
      </span>
    </div>
  );
}
