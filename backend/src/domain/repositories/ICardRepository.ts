import { Card } from "../entities/Card";

export interface ICardRepository {
  save(card: Card): Promise<Card>;
  findByTags(tags?: string[]): Promise<Card[]>;

}
