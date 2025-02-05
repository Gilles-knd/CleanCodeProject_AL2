import {Card} from "../../domain/entities/Card.ts";
import {CardDTO} from "../dtos/CardDTO.ts";
import {ICardRepository} from "../../domain/repositories/ICardRepository.ts";

export class UpdateCardUseCase {
    constructor(private cardRepository: ICardRepository) {}

    async execute(cardId: string, userId: number, dto: CardDTO): Promise<Card> {
        const existingCard = await this.cardRepository.findById(cardId);

        if (!existingCard) {
            throw new Error('Card not found');
        }

        if (existingCard.userId !== userId) {
            throw new Error('Unauthorized access to card');
        }

        const updatedCard = new Card(
            userId,
            cardId,
            existingCard.category,
            dto.question,
            dto.answer,
            dto.tag
        );

        return this.cardRepository.update(updatedCard);
    }
}