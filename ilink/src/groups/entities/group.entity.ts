import { Person } from "../../persons/entities/person.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity({ name: 'Group' })
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 30})
    name: string

    @CreateDateColumn({type: 'timestamptz', name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @CreateDateColumn({type: 'timestamptz', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToMany(() => Person, (person) => person.groups)
    persons: Person[]
}
