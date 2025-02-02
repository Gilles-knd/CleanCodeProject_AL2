import { Card } from "../../src/domain/entities/Card";
import { Category } from "@prisma/client";

describe("Card Entity", () => {
    it("should initialize with given properties", () => {
        const card = new Card( "Q", "A", Category.FIRST, "tag","1");

        expect(card.question).toBe("Q");
        expect(card.answer).toBe("A");
        expect(card.category).toBe(Category.FIRST);
        expect(card.tag).toBe("tag");
        expect(card.id).toBe("1");
    });
});