import { CardAdapter } from "../../infrastructure/adapters/CardAdapter";
import { ICardRepository } from "../../domain/repositories/ICardRepository";
import {CardDTO} from "../dtos/CardDTO";

export class CreateCardUseCase {
    constructor(private repository: ICardRepository) {}

    async execute(dto: CardDTO): Promise<void> {
        const card = CardAdapter.fromDTOtoDomain(dto);
        await this.repository.save(card);
    }
}