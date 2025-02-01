import { Category } from "@prisma/client";

export class Card {
    constructor(
        public readonly id: string,
        public readonly question: string,
        public readonly answer: string,
        public category: Category,
        public readonly createdAt: Date,
        public lastReviewedAt: Date,
        public readonly tag?: string
    ) {}
}