import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { CampaignsService } from "./campaigns.service";

@Controller('campaigns')
export class CampaignsController {

    constructor(private readonly campaignsService: CampaignsService) {}

    @Get("/priorities")
    async getPriorities() {
        return await this.campaignsService.getPriorities();
    }

    @Get("/:id")
    async getCampaign(@Param('id') id: string) {
        return await this.campaignsService.getCampaign(id);
    }

    @Post("/create")
    async postList(@Body() campaign: any) {
         return  await this.campaignsService.createCampaign(campaign);
    }

    @Delete("/:id")
    async delete(@Param('id') id: string) {
       await this.campaignsService.deleteCampaign(id);
       return true;
    }
}
