import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Group } from 'src/group/entities/group.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';

@ObjectType()
@Entity({ name: 'Person' })
export class Person {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String, {nullable: false})
    @Column({ length: 30})
    name: string

    @Field(() => String, {nullable: false})
    @Column({ length: 30})
    surname: string

    @Field(() => Date)
    @CreateDateColumn({type: 'timestamptz', name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Field(() => Date)
    @CreateDateColumn({type: 'timestamptz', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToMany(() => Group, (group) => group.persons, {
      eager: true,
    })
    @JoinTable()
    groups: Group[]
}