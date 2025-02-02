import { Card } from "../../domain/entities/Card";
import { CardDTO } from "../../application/dtos/CardDTO";
import { Category } from "../../domain/types/Category";

export class CardAdapter {
  static fromDTOtoDomain(dto: CardDTO): Card {
    return new Card(
        undefined,
        Category.FIRST,
        dto.question ,
        dto.answer,
        dto.tag ?? ''
    );
  }
}
