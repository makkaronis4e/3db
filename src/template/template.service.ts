import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from "@nestjs/typeorm";
import { Template } from "./template.entity";
import { Repository } from "typeorm";
import { TemplateModel } from "./template.models";


@Injectable({ scope: Scope.REQUEST })
export class TemplateService {

    constructor(
        @InjectRepository(Template)
        private readonly templateRepository: Repository<Template>,
        @Inject(REQUEST) private readonly request: Request,
    ) {}

    getTemplate(id: string): Promise<any> {
        return this.templateRepository.findOne({_id: id});
    }

    list(): Promise<any> {
        return this.templateRepository.find();
    }

    createTemplate(t: TemplateModel): Promise<any> {
        const template = new Template();
        template.channel = t.channel;
        template.name = t.name;
        template.default = t.default;
        template.markup = t.markup;
        template.responsive = t.responsive;
        template._id = uuid();
        return this.templateRepository.save(template);
    }

    deleteTemplate(id: string): Promise<any> {
        return this.templateRepository.delete({_id: id});
    }

}
