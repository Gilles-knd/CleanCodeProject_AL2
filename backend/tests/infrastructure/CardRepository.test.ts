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
        const card = new Card("Q", "A", Category.FIRST, "tag");

        prismaMock.card.create.mockResolvedValue({
            id: "1",
            question: "Q",
            answer: "A",
            category: Category.FIRST,
            tag: "tag",
            createdAt: new Date(),
            lastReviewedAt: new Date()
        });

        const savedCard = await repository.save(card);

        expect(savedCard.id).toBe("1");
        expect(savedCard.question).toBe("Q");
        expect(savedCard.answer).toBe("A");
        expect(savedCard.category).toBe(Category.FIRST);
        expect(savedCard.tag).toBe("tag");
    });
});
