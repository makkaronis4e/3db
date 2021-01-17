import { Module, OnModuleInit} from '@nestjs/common';
import { TargetGroupController } from './target-group.controller';
import { Neo4jService } from 'nest-neo4j/dist';
import { TargetGroupService } from './target-group.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Template } from "../template/template.entity";
import { TargetGroup } from "./target-group.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TargetGroup])],
  controllers: [TargetGroupController],
  providers: [TargetGroupService]
})
export class TargetGroupModule implements OnModuleInit {

  constructor(private readonly neo4jService: Neo4jService) {}

  async onModuleInit() {
    await this.neo4jService.write('CREATE CONSTRAINT ON (c:Client) ASSERT c.id IS UNIQUE').catch(() => {})
  }
}
