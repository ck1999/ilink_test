import { InputType, Field } from '@nestjs/graphql';
import { ArgsPersonInput } from 'src/person/dto/id-person.input';

@InputType()
export class CreateGroupInput {
  @Field({nullable: false})
  name: string;

  @Field(() => [ArgsPersonInput], {nullable: true})
  persons: ArgsPersonInput[]
}
