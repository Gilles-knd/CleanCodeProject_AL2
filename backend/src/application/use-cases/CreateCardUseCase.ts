import { CardAdapter } from "../../infrastructure/adapters/CardAdapter";
import { ICardRepository } from "../../domain/repositories/ICardRepository";
import { CardDTO } from "../dtos/CardDTO";
import { Card } from "../../domain/entities/Card";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class CreateCardUseCase {
  constructor(
      private cardRepository: ICardRepository,
      private userRepository: IUserRepository
  ) {}

  async execute(userId: number, dto: CardDTO): Promise<Card> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const card: Card = CardAdapter.fromDTOtoDomain(dto, userId);
    return this.cardRepository.save(card);
  }
}
