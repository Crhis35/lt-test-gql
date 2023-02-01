import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 } from 'uuid';

@ObjectType()
export class CoreEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  @Field(() => ID)
  id: string = v4();

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
