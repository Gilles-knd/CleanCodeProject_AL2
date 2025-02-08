import {IsBoolean, IsNotEmpty, IsOptional} from "class-validator";

export class AnswerCardDTO {
    @IsBoolean()
    @IsNotEmpty()
    isValid: boolean;

    @IsBoolean()
    @IsOptional()
    forceValidation?: boolean;

    constructor(isValid: boolean, forceValidation?: boolean) {
        this.isValid = isValid;
        this.forceValidation = forceValidation;
    }
}