import { CoreEntity } from '@libs/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
@InputType('PhoneNumberInputType', { isAbstract: true })
export class PhoneNumber {
  @Field(() => String)
  countryCode: string;
  @Field(() => String)
  number: string;
  @Field({ nullable: true })
  ext?: string;
}

@InputType('CompanyInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Company extends CoreEntity {
  @Field(() => String)
  @Column({ unique: true })
  nationalId: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => String)
  @Column()
  imgUrl: string;

  @Field(() => [PhoneNumber])
  @IsArray()
  @Column({ type: 'json' })
  phoneNumber: PhoneNumber[];

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.company)
  products: Product[];
}
