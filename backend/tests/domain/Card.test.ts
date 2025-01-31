import {Card} from "../../src/domain/entities/Card";

describe("Card Entity", () => {
    it("should initialize with FIRST category", () => {
       const card = new Card("1", "Q","A");
         expect(card.category).toBe("FIRST");
         expect(card.question).toBe("Q");
         expect(card.answer).toBe("A");
    });
});
