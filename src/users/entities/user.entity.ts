import { CoreEntity } from '@libs/common';
import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field()
  @Column({ select: false })
  @IsString()
  password: string;

  @Field(() => UserRole)
  @Column({ type: 'simple-enum', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @Field(() => Boolean)
  @Column({ default: false })
  @IsBoolean()
  verified: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 12);
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
