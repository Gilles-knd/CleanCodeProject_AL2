import { mock } from 'jest-mock-extended';
import {ICardRepository} from "../../src/domain/repositories/ICardRepository";
import {CreateCardUseCase} from "../../src/application/use-cases/CreateCardUseCase";
import {Category} from "@prisma/client";
import {Card} from "../../src/domain/entities/Card";


describe("CreateCardUseCase", () => {
    const mockRepo = mock<ICardRepository>();
    const useCase = new CreateCardUseCase(mockRepo);

    it("should create a card with FIRST category", async () => {
        const expectedCard = new Card(
            "some-id",
            "Q",
            "A",
        );

        mockRepo.save.mockResolvedValue(expectedCard);


        const card = await useCase.execute({question: "Q", answer: "A"});
        expect(card.category).toBe(Category.FIRST);
        expect(card.question).toBe("Q");
        expect(card.answer).toBe("A");
        expect(mockRepo.save).toHaveBeenCalled();
    });
});
