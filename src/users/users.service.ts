import { winstonLogger } from '@libs/common/logging';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LogInInput } from '../auth/dtos/login.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
  async findById(id: string): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({ where: { id } });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return { ok: false, error: 'User not found' };
    }
  }
  async createAccount(input: CreateAccountInput): Promise<{
    ok: boolean;
    error?: string;
  }> {
    try {
      winstonLogger?.info(`Create account with ${input}`);
      const { email, password, role, username } = input;
      const exists = await this.users.findOne({
        where: {
          email,
        },
      });

      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      await this.users.save(
        this.users.create({ username, email, password, role }),
      );
      return { ok: true };
    } catch (error) {
      console.error(error);
      winstonLogger?.error(error?.message);
      return { ok: false, error: 'Could not create a user' };
    }
  }
}
