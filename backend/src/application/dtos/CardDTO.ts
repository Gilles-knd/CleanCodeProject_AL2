import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CardDTO {
        @IsString()
        @IsNotEmpty()
        question: string ;

        @IsString()
        @IsNotEmpty()
        answer: string;

        @IsString()
        @IsOptional()
        tag?: string

    constructor(question: string, answer: string, tag?: string) {
        this.question = question;
        this.answer = answer;
        this.tag = tag;
    }

}

