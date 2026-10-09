import type { ReviewItem } from "../../../shared/homeContent";

export const featuredReviewDisplay = "8년차 GovTech 스타트업, 투자 IR 준비 중";

export function isFeaturedReview(review: Pick<ReviewItem, "display">) {
  return review.display.replace(/^[\s\-–—]+/, "").trim() === featuredReviewDisplay;
}

export function presentReviews<T extends ReviewItem>(reviews: T[]): T[] {
  const index = reviews.findIndex(isFeaturedReview);
  if (index <= 0) return [...reviews];
  return [reviews[index], ...reviews.slice(0, index), ...reviews.slice(index + 1)];
}
