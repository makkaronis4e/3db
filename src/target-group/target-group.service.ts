import { Injectable, Scope, Inject } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { v4 as uuid } from 'uuid';
import { Client, TargetGroup } from './target-group.entity';
import { FilterModel, Rule } from './target-group.models';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable({ scope: Scope.REQUEST })
export class TargetGroupService {

    constructor(
        @InjectRepository(TargetGroup)
        private readonly targetGroupRepository: Repository<TargetGroup>,
        @Inject(REQUEST) private readonly request: Request,
        private readonly neo4jService: Neo4jService
    ) {}


    getClient(id: string): Promise<Client> {
        return this.neo4jService.write(`
            MATCH (c:Client {id: $id})
            RETURN c
            `, { id }).then(res => {
                    return new Client(res.records[0].get("c1"));
                })
    }

    async createTargetGroup(name: string, filter: FilterModel): Promise<TargetGroup> {
        const id = uuid();
        const query = `
        MATCH (c1:Client) WHERE ${this.createQuery(filter.rules, "c1").join(' AND ')}
        ${filter.relatedEntities && filter.relatedEntities.length ?
            "MATCH (c1:Client)<-[:" + filter.relatedEntities[0].relationName + "]-(c2) WHERE " + 
            this.createQuery(filter.relatedEntities[0].rules, "c2").join(' AND ') : ""
        }
        RETURN DISTINCT c1`
        const res = await this.neo4jService.write(query)
        const c = res.records.map(r => r.get("c1"));
        const tg = new TargetGroup()
        tg.name = name;
        tg.id = id;
        tg.clients = c;
        tg.filter = filter;
        return this.targetGroupRepository.save(tg);
    }

    getTargetGroup(id: string): Promise<any> {
        return this.targetGroupRepository.findOne({_id: id});
    }

    deleteTemplate(id: string): Promise<any> {
        return this.targetGroupRepository.delete({_id: id});
    }

    list(): Promise<any> {
        return this.targetGroupRepository.find();
    }

    createQuery(rules: Rule[], entity: string): string[] {
        return rules.map(r => {
            return entity + "." + r.name + r.operator + (!this.testForNumber(r.value) ? JSON.stringify(r.value) : r.value);
        })
    }

    testForNumber(str: string): boolean {
        return /^\+?(0|[1-9]\d*)$/.test(str);
    }
}
