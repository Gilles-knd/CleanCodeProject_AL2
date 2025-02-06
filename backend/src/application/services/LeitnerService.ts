
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

    static async updateCardCategory(card: Card, isCorrect: boolean): Promise<Card> {
        try {
            console.log('Current category:', card.category);
            console.log('Is correct:', isCorrect);

            const newCategory = this.getNextCategory(card.category, isCorrect);
            console.log('New category:', newCategory);

            card.category = newCategory;
            card.lastReviewedAt = new Date();

            return card;
        } catch (error) {
            console.error('Error in updateCardCategory:', error);
            throw error;
        }
    }

    private static getNextCategory(currentCategory: Category, isCorrect: boolean): Category {
        console.log('Getting next category for:', currentCategory, isCorrect);

        if (!isCorrect) return Category.FIRST;

        switch (currentCategory) {
            case Category.FIRST:
                return Category.SECOND;
            case Category.SECOND:
                return Category.THIRD;
            case Category.THIRD:
                return Category.FOURTH;
            case Category.FOURTH:
                return Category.FIFTH;
            case Category.FIFTH:
                return Category.SIXTH;
            case Category.SIXTH:
                return Category.SEVENTH;
            case Category.SEVENTH:
                return Category.DONE;
            case Category.DONE:
                return Category.DONE;
            default:
                throw new Error(`Invalid category: ${currentCategory}`);
        }
    }
}