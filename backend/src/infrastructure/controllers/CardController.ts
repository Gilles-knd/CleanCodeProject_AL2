import { Request, Response } from 'express';
import { CreateCardUseCase } from "../../application/use-cases/CreateCardUseCase";
import { CardDTO } from "../../application/dtos/CardDTO";

export class CardController {
    constructor(private createCardUseCase: CreateCardUseCase) {}

    async create(req: Request, res: Response) {
        const dto: CardDTO = new CardDTO(
            req.body.question,
            req.body.answer,
            req.body.tag
        );

        await this.createCardUseCase.execute(dto);
        res.status(201).json({ data: "card created" });
    }
}