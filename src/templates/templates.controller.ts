import { Controller, Get, Post, Body, UseInterceptors, Param, Delete } from "@nestjs/common";
import { Neo4jTypeInterceptor } from 'nest-neo4j/dist';
import { TemplatesService } from "./templates.service";
import { TemplateModel } from "./templates.models";

@UseInterceptors(Neo4jTypeInterceptor)
@Controller('templates')
export class TemplatesController {

    constructor(private readonly templateService: TemplatesService) {}

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
