import React from "react"
import { Star, StarHalf } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  count?: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
  className?: string
}

export default function StarRating({ rating, count, size = "md", showCount = true, className }: StarRatingProps) {
  const sizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <Star key={i} className={cn(sizes[size], "fill-amber-400 text-amber-400")} />
      )
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <StarHalf key={i} className={cn(sizes[size], "fill-amber-400 text-amber-400")} />
      )
    } else {
      stars.push(
        <Star key={i} className={cn(sizes[size], "text-gray-200")} />
      )
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">{stars}</div>
      <span className={cn("font-semibold text-gray-700", size === "sm" ? "text-xs" : "text-sm")}>
        {rating.toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span className={cn("text-gray-400", size === "sm" ? "text-xs" : "text-sm")}>
          ({count} avis)
        </span>
      )}
    </div>
  )
}
