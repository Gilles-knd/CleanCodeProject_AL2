import {ICardRepository} from "../../domain/repositories/ICardRepository.ts";
import {IReviewRepository} from "../../domain/repositories/IReviewRepository.ts";
import {Card} from "../../domain/entities/Card.ts";
import {Review} from "../../domain/entities/Review.ts";
import {LeitnerService} from "../services/LeitnerService.ts";
import {CardService} from "../../domain/services/CardService.ts";
import {AnswerCardDTO} from "../dtos/AnswerCardDTO.ts";

export class AnswerCardUseCase {
    constructor(
        private cardRepository: ICardRepository,
        private reviewRepository: IReviewRepository
    ) {}

    async execute(cardId: string, userId: number, dto: AnswerCardDTO): Promise<{
        card: Card,
        isCorrect: boolean,
        wasForced: boolean
    }> {
        const card = await this.cardRepository.findById(cardId);

        if (!card) {
            throw new Error('Card not found');
        }

        if (card.userId !== userId) {
            throw new Error('Unauthorized access to card');
        }

        const isCorrect = CardService.handleAnswerSubmission(
            card,
            dto.answer,
            dto.forceValidation
        );


        const review = new Review(
            undefined,
            cardId,
            new Date(),
            isCorrect,
            dto.forceValidation || false
        );
        await this.reviewRepository.save(review);


        const updatedCard = await LeitnerService.updateCardCategory(card, isCorrect);
        const savedCard = await this.cardRepository.update(updatedCard);

        return {
            card: savedCard,
            isCorrect,
            wasForced: dto.forceValidation || false
        };
    }
}