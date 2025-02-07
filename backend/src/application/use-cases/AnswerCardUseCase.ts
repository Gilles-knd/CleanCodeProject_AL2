import {ICardRepository} from "../../domain/repositories/ICardRepository.ts";
import {IReviewRepository} from "../../domain/repositories/IReviewRepository.ts";
import {Card} from "../../domain/entities/Card.ts";
import {Review} from "../../domain/entities/Review.ts";
import {LeitnerService} from "../services/LeitnerService.ts";
import {CardService} from "../../domain/services/CardService.ts";
import {AnswerCardDTO} from "../dtos/AnswerCardDTO.ts";
import {GetQuizzCardsUseCase} from "./GetQuizzCardsUseCase.ts";

export class AnswerCardUseCase {
    constructor(
        private cardRepository: ICardRepository,
        private reviewRepository: IReviewRepository,
        private getQuizzCardsUseCase: GetQuizzCardsUseCase
    ) {}

    async execute(cardId: string, userId: number, dto: AnswerCardDTO): Promise<{
        card: Card,
        isCorrect: boolean,
        wasForced: boolean
    }> {
        // Vérifier si la carte existe
        const card = await this.cardRepository.findById(cardId);
        if (!card) {
            throw new Error('Card not found');
        }

        // Vérifier l'accès utilisateur
        if (card.userId !== userId) {
            throw new Error('Unauthorized access to card');
        }

        // Vérifier si la carte a déjà été répondue aujourd'hui
        const hasReviewed = await this.reviewRepository.hasReviewedToday(cardId, userId);
        if (hasReviewed) {
            throw new Error('Card already reviewed today');
        }

        // Vérifier si la carte fait partie du quiz du jour
        const todayCards = await this.getQuizzCardsUseCase.execute(userId);
        const isCardInQuiz = todayCards.some(c => c.id === cardId);
        if (!isCardInQuiz) {
            throw new Error('Card is not part of today\'s quiz');
        }

        // Traiter la réponse
        const isCorrect = CardService.handleAnswerSubmission(
            card,
            dto.answer,
            dto.forceValidation
        );

        // Sauvegarder la review
        const review = new Review(
            undefined,
            cardId,
            new Date(),
            isCorrect,
            dto.forceValidation || false
        );
        await this.reviewRepository.save(review);

        // Mettre à jour la carte
        try {
            const updatedCard = await LeitnerService.updateCardCategory(card, isCorrect);
            const savedCard = await this.cardRepository.update(updatedCard);

            return {
                card: savedCard,
                isCorrect,
                wasForced: dto.forceValidation || false
            };
        } catch (error) {
            throw new Error('Failed to update card category');
        }
    }
}