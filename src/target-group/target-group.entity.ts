import { Node } from 'neo4j-driver'
import { FilterModel } from './target-group.models';

export class TargetGroup {

    constructor(
      private name: string,
      private id: string,
      private clients: Client[],
      private filter: FilterModel) {}

    toJson(): Record<string, any> {
        return {
            ...this,
        }
    }
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

