import {Category} from "@prisma/client";

export class Card {
    constructor(
        public readonly id: string,
        public readonly question: string,
        public readonly answer: string,
        public  category: Category = Category.FIRST,
        public lastReviewedAt: Date = new Date(),
        public tag?: string
    ) {}
}