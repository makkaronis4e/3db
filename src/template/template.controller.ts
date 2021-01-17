import { Controller, Get, Post, Body, UseInterceptors, Param, Delete } from "@nestjs/common";
import { Neo4jTypeInterceptor } from 'nest-neo4j/dist';
import { Template } from "./template.entity";
import { TemplateService } from "./template.service";
import { TemplateModel } from "./template.models";

@UseInterceptors(Neo4jTypeInterceptor)
@Controller('template')
export class TemplateController {

    constructor(private readonly templateService: TemplateService) {}

    @Get("/:id")
    async getTemplate(@Param('id') id: string) {
        return await this.templateService.getTemplate(id);
    }

    @Get()
    async getTemplates() {
        return await this.templateService.list();
    }

    @Post("/create")
    async postList(@Body() createTemplateDto: TemplateModel) {
         return  await this.templateService.createTemplate(createTemplateDto);
    }

    @Delete("/:id")
    async delete(@Param('id') id: string) {
       await this.templateService.deleteTemplate(id);
       return true;
    }
}
