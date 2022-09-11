import { CreateGroupInput } from './create-group.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { ArgsPersonInput } from 'src/person/dto/id-person.input';

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {
  @Field(() => ID)
  id: number;

  @Field({nullable: true})
  name: string

  @Field(() => [ArgsPersonInput], {nullable: true})
  users: ArgsPersonInput[]
}
