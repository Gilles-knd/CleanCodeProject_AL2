import { Card } from "../../domain/entities/Card";
import {CardDTO, CardResponse} from "../../application/dtos/CardDTO";
import { Category } from "../../domain/types/Category";

export class CardAdapter {
  static fromDTOtoDomain(dto: CardDTO, userId: number): Card {
    return new Card(
        userId,
        undefined,
        Category.FIRST,
        dto.question,
        dto.answer,
        dto.tag
    );
  }

  static toResponse(card: Card): CardResponse {
    return {
      id: card.id!,
      question: card.question,
      answer: card.answer,
      category: card.category,
      tag: card.tag
    };
  }
}