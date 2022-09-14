import { Person } from "../../persons/entities/person.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, DeleteDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Group' })
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 30})
    name: string

    @CreateDateColumn({type: 'timestamptz', name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamptz', name: 'updated_at'})
    updatedAt: Date;

    @DeleteDateColumn({type: 'timestamptz', name: 'deleted_at'})
    deletedAt: Date;

    @ManyToMany(() => Person, (person) => person.groups)
    persons: Person[]
}
