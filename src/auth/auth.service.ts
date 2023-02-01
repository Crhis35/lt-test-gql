import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { LogInInput } from './dtos/login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async login({
    email,
    password,
  }: LogInInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne({
        select: ['id', 'password'],
        where: { email },
      });
      if (!user) {
        return { ok: false, error: 'No user with that email' };
      }
      const isValid = await user.checkPassword(password);

      if (!isValid) {
        return { ok: false, error: 'Incorrect password' };
      }
      const token = this.jwtService.sign({
        username: user.username,
        sub: user.id,
      });

      return { ok: true, token };
    } catch (error) {
      return { ok: false, error: 'Could not login' };
    }
  }
}
