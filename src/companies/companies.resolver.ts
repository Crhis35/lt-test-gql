import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorator';
import { CompaniesService } from './companies.service';
import {
  CreateCompanyInput,
  CreateCompanyOutput,
} from './dtos/create-company.dto';
import {
  CompanyPaginationInput,
  CompanyPaginationOutput,
} from './dtos/list-companies.dto';

@Resolver()
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Query(() => CompanyPaginationOutput)
  async listCompanies(@Args('input') input: CompanyPaginationInput) {
    return this.companiesService.listCompanies(input);
  }

  @Role(['ADMIN'])
  @Mutation(() => CreateCompanyOutput)
  async createCompany(@Args('input') input: CreateCompanyInput) {
    return this.companiesService.createCompany(input);
  }
}
