import {Field, ID, InputType} from "@nestjs/graphql";


@InputType()
export class ArgsPersonInput {
    @Field(() => ID)
    id: string
}