import { CardRepository } from "../../src/infrastructure/repositories/CardRepository";
import { Card } from "../../src/domain/entities/Card";
import { Category } from "../../src/domain/types/Category";
import { prismaMock } from "../../src/jest.setup.ts";

describe("CardRepository", () => {
    let repository: CardRepository;

    beforeEach(() => {
        repository = new CardRepository();
    });

    it("should save a card", async () => {
        const card = new Card(undefined, Category.FIRST, "Q", "A", "tag");

        prismaMock.card.create.mockResolvedValue({
            id: "fd43d416-9f7c-46de-bf0c-a1ea214a8d0f",
            question: "Q",
            answer: "A",
            category: Category.FIRST,
            tag: "tag",
            createdAt: new Date(),
            lastReviewedAt: new Date()
        });

        const savedCard = await repository.save(card);

        expect(typeof savedCard.id).toBe("string");
        expect(savedCard.question).toBe("Q");
        expect(savedCard.answer).toBe("A");
        expect(savedCard.category).toBe(Category.FIRST);
        expect(savedCard.tag).toBe("tag");
    });
});
