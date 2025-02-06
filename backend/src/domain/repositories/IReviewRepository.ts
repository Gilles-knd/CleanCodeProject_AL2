import {Review} from "../entities/Review.ts";

export interface IReviewRepository {
    save(review: Review): Promise<Review>;
}