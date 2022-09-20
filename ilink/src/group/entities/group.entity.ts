import { Person } from "../../person/entities/person.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToMany, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'Group' })
export class Group {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String, {nullable: false})
    @Column({ length: 30})
    name: string

    @Field(() => Date)
    @CreateDateColumn({type: 'timestamptz', name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn({type: 'timestamptz', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Field(() => Date)
    @DeleteDateColumn({type: 'timestamptz', name: 'deleted_at'})
    deletedAt: Date;

    @Field(() => [Person])
    @ManyToMany(() => Person, (person) => person.groups)
    persons: Person[]
}
