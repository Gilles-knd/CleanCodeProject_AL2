import {ICardRepository} from "../../domain/repositories/ICardRepository";
import {Card} from "@prisma/client";
import db from "../db/prisma";

export class CardRepository implements ICardRepository {
    async save(card: Card): Promise<void> {
         await db.card.create({
            data: {
                question: card.question,
                answer: card.answer,
                tag: card.tag,
                category: card.category,
                lastReviewedAt: card.lastReviewedAt
            }
        });
    }

}