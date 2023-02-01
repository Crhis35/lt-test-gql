import { winstonLogger } from '@libs/common/logging';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCompanyInput,
  CreateCompanyOutput,
} from './dtos/create-company.dto';
import {
  CompanyPaginationInput,
  CompanyPaginationOutput,
} from './dtos/list-companies.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private readonly company: Repository<Company>,
  ) {}

  async createCompany(input: CreateCompanyInput): Promise<CreateCompanyOutput> {
    try {
      const company = await this.company.save(this.company.create(input));
      return {
        ok: true,
        item: company,
      };
    } catch (error) {
      winstonLogger?.error(`Error on create company ${error.message}`);

      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async listCompanies({
    page,
  }: CompanyPaginationInput): Promise<CompanyPaginationOutput> {
    try {
      const [items, totalResults] = await this.company.findAndCount({
        take: 25,
        skip: (page - 1) * 25,
        relations: ['products'],
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
        error: 'Could not get all company',
      };
    }
  }
}
