import {IsString, IsNotEmpty, IsOptional, IsUUID} from "class-validator";

export class CardDTO {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsString()
  @IsOptional()
  tag?: string;

  constructor(question: string, answer: string, tag?: string) {
    this.question = question;
    this.answer = answer;
    this.tag = tag;
  }
}

export class UpdateCardDTO extends CardDTO {
  @IsUUID()
  id: string;

  constructor(id: string, question: string, answer: string, tag?: string) {
    super(question, answer, tag);
    this.id = id;
  }
}

