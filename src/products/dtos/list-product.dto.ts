import { PaginationInput, PaginationOutput } from '@libs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@InputType()
export class ProductPaginationInput extends PaginationInput {}

@ObjectType()
export class ProductPaginationOutput extends PaginationOutput {
  @Field(() => [Product], { nullable: true })
  items?: Product[];
}
