import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TemplateModel } from "../template.models";

export class Template {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    filter: TemplateModel;
}

export class CreateTemplateDto {

    @ValidateNested()
    @Type(() => Template)
    filter: Template;

}
