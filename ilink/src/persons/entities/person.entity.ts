import { Group } from "../../groups/entities/group.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, DeleteDateColumn, UpdateDateColumn } from "typeorm";

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

    @UpdateDateColumn({type: 'timestamptz', name: 'updated_at'})
    updatedAt: Date;

    @DeleteDateColumn({type: 'timestamptz', name: 'deleted_at'})
    deletedAt: Date;

    @ManyToMany(() => Group, (group) => group.persons, {
        eager: true,
    })
    @JoinTable()
    groups: Group[]
}
