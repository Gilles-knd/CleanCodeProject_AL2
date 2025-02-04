import { Category } from "./Category";

export interface ICard {
  id: string
  question: string;
  answer: string;
  category: Category;
  tag?: string;
}

export type NewCard = Omit<ICard, "id">;