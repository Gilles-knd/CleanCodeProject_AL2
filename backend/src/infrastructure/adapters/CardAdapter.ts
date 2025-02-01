import { Card } from "../../domain/entities/Card";
import { Category } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import {CardDTO} from "../../application/dtos/CardDTO";

export class CardAdapter {
    static fromDTOtoDomain(dto: CardDTO): Card {
        return new Card(
            uuidv4(),
            dto.question,
            dto.answer,
            Category.FIRST,
            new Date(),
            new Date(),
            dto.tag
        );
    }
}