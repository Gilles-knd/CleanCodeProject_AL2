import { mock } from 'jest-mock-extended';

describe("CreateCardUseCase", () => {
    const mockRepo = mock<ICardRepository>();
    const useCase = new CreateCardUseCase(mockRepo);

    it("should create a card with FIRST category", async () => {
        const card = await useCase.execute({question: "Q", answer: "A"});
        expect(card.category).toBe("FIRST");
        expect(card.question).toBe("Q");
        expect(card.answer).toBe("A");
    });
});
