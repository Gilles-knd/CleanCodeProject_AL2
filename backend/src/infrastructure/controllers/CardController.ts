import { Request, Response } from "express";
import { CreateCardUseCase } from "../../application/use-cases/CreateCardUseCase";
import { CardDTO } from "../../application/dtos/CardDTO";
import {validateOrReject} from "class-validator";

export class CardController {
  constructor(private createCardUseCase: CreateCardUseCase) {}

  async create(req: Request, res: Response) {
    try {

        const dto:CardDTO = new CardDTO(
            req.body.question,
            req.body.answer,
            req.body.tag,
        );

        await validateOrReject(dto);
        const result = await this.createCardUseCase.execute(dto);
        res.status(201).json({ description: "card created",data: result });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
