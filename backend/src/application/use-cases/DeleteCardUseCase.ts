import {ICardRepository} from "../../domain/repositories/ICardRepository.ts";

export class DeleteCardUseCase {
    constructor(private cardRepository: ICardRepository) {}

    async execute(id: string): Promise<void> {
        console.log("je suis la dans le DeleteCardUseCase");
        await this.cardRepository.delete(id);
    }
}