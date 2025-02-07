import {Review} from "../entities/Review.ts";

export interface IReviewRepository {
    save(review: Review): Promise<Review>;
    hasReviewedToday(cardId: string, userId: number): Promise<boolean>;
}