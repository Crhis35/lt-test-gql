import { winstonLogger } from '@libs/common/logging';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Repository } from 'typeorm';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-product.dto';
import { ProductPaginationInput } from './dtos/list-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly products: Repository<Product>,
    @InjectRepository(Company) private readonly companies: Repository<Company>,
  ) {}
  async createProduct(input: CreateProductInput): Promise<CreateProductOutput> {
    try {
      winstonLogger?.info(`Creating product with ${input}`);
      const company = await this.companies.findOne({
        where: {
          id: input.companyId,
        },
      });
      if (!company) {
        return {
          ok: false,
          error: 'Restaurant not found',
        };
      }
      const item = await this.products.save(
        this.products.create({ ...input, company }),
      );
      return {
        ok: true,
        item,
      };
    } catch (error) {
      winstonLogger?.error(`Error on create product ${error.message}`);
      return {
        ok: false,
        error: 'Could not create dish',
      };
    }
  }
  async listProducts({ page }: ProductPaginationInput) {
    try {
      const [items, totalResults] = await this.products.findAndCount({
        take: 25,
        skip: (page - 1) * 25,
        relations: ['company'],
      });
      return {
        ok: true,
        items,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not get all products',
      };
    }
  }
}
