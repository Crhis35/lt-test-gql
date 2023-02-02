import { CoreEntity } from '@libs/common';
import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { Company } from 'src/companies/entities/company.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@InputType('ProductStockInpuType')
export class ProductStock {
  @Field(() => Float)
  max: number;

  @Field(() => Float)
  min: number;

  @Field(() => Float)
  available: number;

  @Field(() => Float)
  transit: number;

  @Field(() => Float)
  reservation: number;
}

@InputType('ProductInputType')
@ObjectType()
@Entity()
export class Product extends CoreEntity {
  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column({ type: 'float' })
  @IsNumber()
  price: number;

  @Field(() => ProductStock)
  @Column({ type: 'json' })
  stock: ProductStock;

  @Field()
  @Column()
  imgUrl: string;

  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.products, {
    onDelete: 'SET NULL',
  })
  company: Company;
}
