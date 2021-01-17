import { Node } from "neo4j-driver"
import { FilterModel } from "./target-group.models";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity('TargetGroup')
export class TargetGroup {

    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
      name: string;

    @Column()
      clients: Client[];

    @Column()
      filter: FilterModel;
}


export class Client {

    constructor(
      private readonly client: Node,
    ) {}

    toJson(): Record<string, any> {
        return {
            ...this.client.properties,
        }
    }
}

