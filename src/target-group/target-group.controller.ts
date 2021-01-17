import { Controller, Get, Post, Body, UseInterceptors, Param, Delete } from "@nestjs/common";
import { Neo4jTypeInterceptor } from 'nest-neo4j/dist';
import { TargetGroupService } from './target-group.service';
import { Filter } from './dto/create-target-group.dto';


@UseInterceptors(Neo4jTypeInterceptor)
@Controller('target-group')
export class TargetGroupController {

    constructor(
        private readonly targetGroupService: TargetGroupService) {}

    @Get("/:id")
    async getTargetGroup(@Param('id') id: string) {
        return await this.targetGroupService.getTargetGroup(id);
    }

    @Get()
    async getTargetGroups() {
        return await this.targetGroupService.list();
    }

    @Delete("/:id")
    async deleteTargetGroup(@Param('id') id: string) {
        return await this.targetGroupService.deleteTemplate(id);
    }

    @Get("/client/:id")
    async getClient(@Param('id') id: string) {
        const client = await this.targetGroupService.getClient(id);
        return client.toJson();
    }

    @Post("/create")
    async postList(@Body() createTargetGroupDto: Filter) {
        const targetGroup = await this.targetGroupService.createTargetGroup(
          createTargetGroupDto.name,
          createTargetGroupDto.filter,
        )
        return targetGroup;
    }
}
