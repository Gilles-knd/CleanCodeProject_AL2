import {IReviewRepository} from "../../domain/repositories/IReviewRepository.ts";
import {ICardRepository} from "../../domain/repositories/ICardRepository.ts";
import {Card} from "../../domain/entities/Card.ts";
import {LeitnerService} from "../services/LeitnerService.ts";

export class GetQuizzCardsUseCase {
    constructor(
        private cardRepository: ICardRepository,
        private reviewRepository: IReviewRepository
    ) {}

    async execute(targetDate?: string): Promise<Card[]> {
        const date = targetDate ? new Date(targetDate) : new Date();
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }

        const cards = await this.cardRepository.findAll();
        const dueCards = await Promise.all(
            cards.map(async card => {
                const hasReviewedToday = await this.reviewRepository.hasReviewedToday(card.id!);
                if (hasReviewedToday) return null;

                const isDue = await LeitnerService.isCardDueForReview(
                    card,
                    this.reviewRepository,
                    date
                );
                return isDue ? card : null;
            })
        );

        const filteredCards = dueCards.filter((card): card is Card => card !== null);
        return LeitnerService.sortCardsByPriority(filteredCards);
    }
}