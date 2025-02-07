import {ICardRepository} from "../../domain/repositories/ICardRepository.ts";
import {Card} from "../../domain/entities/Card.ts";
import {LeitnerService} from "../services/LeitnerService.ts";
import {CheckQuizAvailabilityUseCase} from "./CheckQuizAvailabilityUseCase.ts";

export class GetQuizzCardsUseCase {
    constructor(private cardRepository: ICardRepository,private checkQuizAvailabilityUseCase: CheckQuizAvailabilityUseCase) {}

    async execute(userId: number, targetDate?: string): Promise<Card[]> {

        const canTakeQuiz = await this.checkQuizAvailabilityUseCase.execute(userId);
        if (!canTakeQuiz) {
            throw new Error('Daily quiz already taken');
        }

        const date = targetDate ? new Date(targetDate) : new Date();
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }


        const userCards = await this.cardRepository.findByUserId(userId);


        const dueCards = userCards.filter(card =>
            LeitnerService.isCardDueForReview(card, date)
        );

        await this.checkQuizAvailabilityUseCase.updateLastQuizDate(userId);


        return LeitnerService.sortCardsByPriority(dueCards);
    }
}