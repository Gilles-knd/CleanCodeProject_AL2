import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";

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