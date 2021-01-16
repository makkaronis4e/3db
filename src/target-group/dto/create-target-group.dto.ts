// {"article":{"title":"How to train your dragon", "description":"Ever wonder how?", "body":"Very carefully.", "tagList":["dragons","training"]}}

import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { FilterModel } from '../target-group.models';

export class Filter {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    filter: FilterModel;
}

export class CreateTargetGroupDto {

    @ValidateNested()
    @Type(() => Filter)
    filter: Filter;

}
