import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { PrismaService } from "./prisma.service";
import { CampaignModel } from "./campaigns.models";
import { v4 as uuid } from 'uuid';

@Injectable({scope: Scope.REQUEST})
export class CampaignsService {

    constructor(
        private prisma: PrismaService,
        @Inject(REQUEST) private readonly request: Request,
    ) {
    }

   async getPriorities(): Promise<any> {
        return await this.prisma.priority.findMany();
   }

    async createCampaign(campaign: CampaignModel): Promise<any> {
        return await this.prisma.campaign.create({
            data: {
                name: campaign.name,
                contentid: campaign.contentid,
                targetgroupid: campaign.targetgroupid,
                id: uuid(),
                priority: {
                    connect: {
                        id: campaign.priorityid,
                    }
                }
            },
        });
    }

    async getCampaign(id: string): Promise<any> {
        return await this.prisma.campaign.findOne({
            where: {
                id,
            },
        });
    }

    async deleteCampaign(id: string): Promise<any> {
        return await this.prisma.campaign.delete({
            where: {
                id,
            },
        });
    }

}
