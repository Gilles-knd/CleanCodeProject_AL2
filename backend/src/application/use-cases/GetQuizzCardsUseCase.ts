import {ICardRepository} from "../../domain/repositories/ICardRepository.ts";
import {Card} from "../../domain/entities/Card.ts";
import {LeitnerService} from "../services/LeitnerService.ts";


export class GetQuizzCardsUseCase {
    constructor(private cardRepository: ICardRepository) {}

    async execute(userId: number, targetDate?: string): Promise<Card[]> {

        const date = targetDate ? new Date(targetDate) : new Date();
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }


        const userCards = await this.cardRepository.findByUserId(userId);


        const dueCards = userCards.filter(card =>
            LeitnerService.isCardDueForReview(card, date)
        );


        const sortedCards = LeitnerService.sortCardsByPriority(dueCards);


        return sortedCards.map(card => ({
            ...card,
            answer: ''
        }));
    }
}