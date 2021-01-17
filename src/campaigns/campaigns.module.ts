import { Module } from '@nestjs/common';
import { CampaignsService } from "./campaigns.service";
import { CampaignsController } from "./campaigns.controller";
import { PrismaService } from "./prisma.service";


@Module({
    controllers: [CampaignsController],
    providers: [CampaignsService, PrismaService]
})
export class CampaignsModule {
}
