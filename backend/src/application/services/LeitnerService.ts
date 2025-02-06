
import {Card} from "../../domain/entities/Card.ts";
import {Category} from "../../domain/types/Category.ts";


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

    static getNextCategory(currentCategory: Category, isCorrect: boolean): Category {
        if (!isCorrect) return Category.FIRST;

        const categories = [
            Category.FIRST,
            Category.SECOND,
            Category.THIRD,
            Category.FOURTH,
            Category.FIFTH,
            Category.SIXTH,
            Category.SEVENTH,
            Category.DONE
        ];

        const currentIndex = categories.indexOf(currentCategory);
        return currentIndex < categories.length - 1
            ? categories[currentIndex + 1]
            : Category.DONE;
    }

    static async updateCardCategory(
        card: Card,
        isCorrect: boolean,
        forcedValid: boolean = false
    ): Promise<Card> {

        const finalIsCorrect = isCorrect || forcedValid;

        card.category = this.getNextCategory(card.category, finalIsCorrect);
        card.lastReviewedAt = new Date();

        return card;
    }
}