import { Group } from "../../groups/entities/group.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity({ name: 'Person' })
export class Person {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 30})
    name: string

    @Column({ length: 30})
    surname: string

    @CreateDateColumn({type: 'timestamptz', name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @CreateDateColumn({type: 'timestamptz', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToMany(() => Group, (group) => group.persons, {
        eager: true,
    })
    @JoinTable()
    groups: Group[]
}
