import {Category} from "@prisma/client";


export class Card {
  constructor(
    public readonly question: string,
    public readonly answer: string,
    public category: Category,
    public readonly tag: string ,
    public readonly id?: string,
  ) {}
}


