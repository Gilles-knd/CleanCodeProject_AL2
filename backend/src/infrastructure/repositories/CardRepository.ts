import { ICardRepository } from "../../domain/repositories/ICardRepository";
import db from "../db/prisma";
import { Card } from "../../domain/entities/Card.ts";
import {Category} from "../../domain/types/Category.ts";



export class CardRepository implements ICardRepository {
  async save(card: Card): Promise<Card> {
    const savedCard = await db.card.create({
      data: {
        question: card.question,
        answer: card.answer,
        tag: card.tag ?? null,
      },
    });


    return new Card(
        savedCard.id,
        savedCard.question,
        savedCard.category as Category,
        savedCard.answer,
        savedCard.tag
    );
  }
}