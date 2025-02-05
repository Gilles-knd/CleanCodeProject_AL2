import { Request, Response} from "express";
import {CreateCardUseCase} from "../../application/use-cases/CreateCardUseCase";
import {CardDTO} from "../../application/dtos/CardDTO";
import {validateOrReject} from "class-validator";
import {GetCardsUseCase} from "../../application/use-cases/GetCardsUseCase.ts";
import {plainToInstance} from "class-transformer";
import {GetCardsQueryParamsDTO} from "../../application/dtos/GetCardsQueryParams.ts";
import {CardAdapter} from "../adapters/CardAdapter.ts";
import {UpdateCardUseCase} from "../../application/use-cases/UpdateCardUseCase.ts";
import {DeleteCardUseCase} from "../../application/use-cases/DeleteCardUseCase.ts";
export class CardController {
    constructor(
        private readonly createCardUseCase: CreateCardUseCase,
        private readonly getCardsUseCase: GetCardsUseCase,
        private readonly updateCardUseCase: UpdateCardUseCase,
        private readonly deleteCardUseCase: DeleteCardUseCase
    ) {}

    async create(req: Request, res: Response) {
        try {
            const dto = new CardDTO(req.body.question, req.body.answer, req.body.tag);
            await validateOrReject(dto);

            if (!req.user || req.user.id === undefined) {
                res.status(401).json({ error: 'Unauthorized' });


            }

            const card = await this.createCardUseCase.execute(req.user.id!, dto);
            res.status(201).json({
                data: {
                    id: card.id,
                    question: card.question,
                    answer: card.answer,
                    category: card.category,
                    tag: card.tag
                }
            });
            return;
        } catch (error: any) {
            res.status(400).json({ error: error.message || 'Invalid request' });
            return;
        }
    }

    async getAll(req: Request, res: Response):Promise<any> {
        try {
            const queryParams = plainToInstance(GetCardsQueryParamsDTO, req.query);
            await validateOrReject(queryParams);

            const cards = await this.getCardsUseCase.execute(queryParams.tag);

            res.status(200).json({
                data: cards.map(card => CardAdapter.toResponse(card))
            });
            return;
        } catch (error: any) {
            res.status(400).json({ error: error.message || 'Failed to fetch cards' });
            return;
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { cardId } = req.params;
            const dto = new CardDTO(req.body.question, req.body.answer, req.body.tag);
            await validateOrReject(dto);

            if (!req.user || req.user.id === undefined) {
               res.status(401).json({ error: 'Unauthorized' });
               return;
            }

            const updatedCard = await this.updateCardUseCase.execute(cardId, req.user.id, dto);
            res.status(200).json({
                data: CardAdapter.toResponse(updatedCard)
            });
            return;
        } catch (error: any) {
            if (error.message === 'Card not found') {
                res.status(404).json({ error: 'Card not found' });
                return;
            }
            if (error.message === 'Unauthorized access to card') {
                res.status(403).json({ error: 'Forbidden' });
                return;
            }
            res.status(400).json({ error: error.message || 'Invalid request' });
            return;
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { cardId } = req.params;

            if (!req.user || req.user.id === undefined) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            await this.deleteCardUseCase.execute(cardId);
            res.status(204).send();
            return;
        } catch (error: any) {
            if (error.message === 'Card not found') {
                res.status(404).json({ error: 'Card not found' });
                return;
            }
            if (error.message === 'Unauthorized access to card') {
                res.status(403).json({ error: 'Forbidden' });
                return;
            }
            res.status(400).json({ error: error.message || 'Invalid request' });
            return;
        }
    }
}