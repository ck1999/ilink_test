import { Person } from "src/person/entities/person.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

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
    @CreateDateColumn({type: 'timestamptz', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Field(() => [Person])
    @ManyToMany(() => Person, (person) => person.groups)
    persons: Person[]
}
