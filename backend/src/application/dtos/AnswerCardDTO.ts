import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class AnswerCardDTO {
    @IsString()
    @IsNotEmpty()
    answer: string;

    @IsBoolean()
    @IsOptional()
    forceValidation?: boolean;
    constructor(answer: string, forceValidation?: boolean) {
        this.answer = answer;
        this.forceValidation = forceValidation;
    }
}