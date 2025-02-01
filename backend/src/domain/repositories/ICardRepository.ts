import {Card} from "../entities/Card";

export interface ICardRepository {
    save(card: Card): Promise<void>;
}