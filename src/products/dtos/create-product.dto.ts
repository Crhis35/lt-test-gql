import { CoreOutput } from '@libs/common';
import { Field, ID, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@InputType()
export class CreateProductInput extends PickType(Product, [
  'name',
  'imgUrl',
  'price',
  'stock',
]) {
  @Field(() => ID)
  companyId: string;
}

@ObjectType()
export class CreateProductOutput extends CoreOutput {
  @Field(() => Product, { nullable: true })
  item?: Product;
}
