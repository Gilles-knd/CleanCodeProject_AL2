import { Card } from "../../src/domain/entities/Card";
import { Category } from "../../src/domain/types/Category";

describe("Card Entity", () => {
    it("should initialize with given properties", () => {
        const card = new Card("1", Category.FIRST, "Q", "A", "tag",);

        expect(card.id).toBe("1");
        expect(card.category).toBe(Category.FIRST);
        expect(card.question).toBe("Q");
        expect(card.answer).toBe("A");
        expect(card.tag).toBe("tag");

    });
});