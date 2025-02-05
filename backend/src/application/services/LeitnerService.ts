import {Category} from "@prisma/client";
import {Card} from "../../domain/entities/Card.ts";


export class LeitnerService {
    private static readonly INTERVALS: Record<Category, number> = {
        FIRST: 1,
        SECOND: 2,
        THIRD: 4,
        FOURTH: 8,
        FIFTH: 16,
        SIXTH: 32,
        SEVENTH: 64,
        DONE: Infinity
    };

    static isCardDueForReview(card: Card, targetDate: Date): boolean {
        const lastReviewDate = new Date(card.lastReviewedAt);
        const interval = this.INTERVALS[card.category];

        // Calculer la prochaine date de révision en ajoutant l'intervalle complet en heures
        const nextReviewDate = new Date(lastReviewDate);
        nextReviewDate.setHours(
            lastReviewDate.getHours() + (interval * 24)
        );

        return nextReviewDate <= targetDate;
    }

    static sortCardsByPriority(cards: Card[]): Card[] {
        return [...cards].sort((a, b) => {
            // D'abord trier par catégorie (priorité aux catégories inférieures)
            const categoryComparison =
                Object.keys(this.INTERVALS).indexOf(a.category) -
                Object.keys(this.INTERVALS).indexOf(b.category);

            if (categoryComparison !== 0) return categoryComparison;

            // Ensuite par date de dernière révision (priorité aux plus anciennes)
            return new Date(a.lastReviewedAt).getTime() - new Date(b.lastReviewedAt).getTime();
        });
    }
}