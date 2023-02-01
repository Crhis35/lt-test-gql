import { CoreOutput } from '@libs/common';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
  'username',
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
