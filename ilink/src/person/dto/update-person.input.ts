import { CreatePersonInput } from './create-person.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { ArgsGroupInput } from '../../group/dto/id-group.input';

@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {
  @Field(() => Int)
  id: number;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  surname: string

  @Field(() => [ArgsGroupInput], {nullable: true})
  persons: ArgsGroupInput[]
}