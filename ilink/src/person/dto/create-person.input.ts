import { InputType, Field } from '@nestjs/graphql';
import { ArgsGroupInput } from '../../group/dto/id-group.input';

@InputType()
export class CreatePersonInput {
  @Field({nullable: false})
  name: string;

  @Field({nullable: false})
  surname: string;

  @Field(() => [ArgsGroupInput], {nullable: true})
  groups: ArgsGroupInput[]
}
