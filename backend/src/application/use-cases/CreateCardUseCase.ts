import {Card} from "../../domain/entities/Card";
import { v4 as uuidv4 } from 'uuid';
export class CreateCardUseCase {
    constructor(private cardRepository: ICardRepository) {}

    async execute(data: { question: string, answer: string, tag?: string }): Promise<Card> {
        const card = new Card(
            uuidv4(),
            data.question,
            data.answer,
            undefined,
            undefined,
            data.tag
        );
        return this.cardRepository.save(card);
    }
}