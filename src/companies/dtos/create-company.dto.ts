import { CoreOutput } from '@libs/common';
import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Company } from '../entities/company.entity';

@InputType()
export class CreateCompanyInput extends OmitType(Company, [
  'id',
  'products',
  'createdAt',
  'updatedAt',
] as const) {}

@ObjectType()
export class CreateCompanyOutput extends CoreOutput {
  @Field(() => Company, { nullable: true })
  item?: Company;
}
