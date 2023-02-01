import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorator';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-product.dto';
import {
  ProductPaginationInput,
  ProductPaginationOutput,
} from './dtos/list-product.dto';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Role(['ADMIN'])
  @Mutation(() => CreateProductOutput)
  async createProduct(@Args('input') input: CreateProductInput) {
    return this.productsService.createProduct(input);
  }

  @Query(() => ProductPaginationOutput)
  async listProducts(@Args('input') input: ProductPaginationInput) {
    return this.productsService.listProducts(input);
  }
}
