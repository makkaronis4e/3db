import { Module } from '@nestjs/common';
import { TemplatesController } from "./templates.controller";
import { TemplatesService } from "./templates.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Template } from "./templates.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Template], "default")],
    controllers: [TemplatesController],
    providers: [TemplatesService]
})
export class TemplatesModule {
}
