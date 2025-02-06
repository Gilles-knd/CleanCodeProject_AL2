import {Review} from "../../domain/entities/Review.ts";
import {IReviewRepository} from "../../domain/repositories/IReviewRepository.ts";
import db from "../db/prisma.ts";

export class ReviewRepository implements IReviewRepository {
    async save(review: Review): Promise<Review> {
        const savedReview = await db.review.create({
            data: {
                cardId: review.cardId,
                reviewedAt: review.reviewedAt,
                isCorrect: review.isCorrect,
                forcedValid: review.forcedValid
            }
        });

        return new Review(
            savedReview.id,
            savedReview.cardId,
            savedReview.reviewedAt,
            savedReview.isCorrect,
            savedReview.forcedValid
        );
    }
}