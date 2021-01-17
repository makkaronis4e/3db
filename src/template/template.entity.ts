import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { Markup } from "./template.models";

@Entity('template')
export class Template {

    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    markup: Markup;

    @Column()
    channel: string;

    @Column()
    default: boolean;

    @Column()
    responsive: boolean;
}

