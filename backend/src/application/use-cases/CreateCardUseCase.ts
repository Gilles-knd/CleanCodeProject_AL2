import { CardAdapter } from "../../infrastructure/adapters/CardAdapter";
import { ICardRepository } from "../../domain/repositories/ICardRepository";
import { CardDTO } from "../dtos/CardDTO";
import { Card } from "../../domain/entities/Card";


export class CreateCardUseCase {
  constructor(private repository: ICardRepository) {}

  async execute(dto: CardDTO): Promise<Card> {
    const card = CardAdapter.fromDTOtoDomain(dto);
    return await this.repository.save(card);
  }
}
