import {Field, ID, InputType} from "@nestjs/graphql";


@InputType()
export class ArgsGroupInput {
    @Field(() => ID)
    id: string
}