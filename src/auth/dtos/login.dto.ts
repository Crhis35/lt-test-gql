import { CoreOutput } from '@libs/common';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@InputType()
export class LogInInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field({ nullable: true })
  token?: string;
}
