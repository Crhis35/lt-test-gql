import { PaginationInput, PaginationOutput } from '@libs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Company } from '../entities/company.entity';

@InputType()
export class CompanyPaginationInput extends PaginationInput {}

@ObjectType()
export class CompanyPaginationOutput extends PaginationOutput {
  @Field(() => [Company], { nullable: true })
  items?: Company[];
}
