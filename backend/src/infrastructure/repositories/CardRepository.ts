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
        userId: Number(card.userId)
      },
    });

    return new Card(
        savedCard.userId,
        savedCard.id,
        savedCard.category as Category,
        savedCard.question,
        savedCard.answer,
        savedCard.tag!
    );
  }

  async findByTags(tags?: string[]): Promise<Card[]> {
    const where = tags ? { tag: { in: tags } } : {};

    const cards = await db.card.findMany({
      where,
      select: {
        id: true,
        question: true,
        answer: true,
        tag: true,
        category: true,
        userId: true
      }
    });

    return cards.map(card => new Card(
        card.userId,
        card.id,
        card.category as Category,
        card.question,
        card.answer,
        card.tag ?? undefined
    ));
  }
}