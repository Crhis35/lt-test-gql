import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginOutput, LogInInput } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LogInInput): Promise<LoginOutput> {
    try {
      const res = await this.authService.login(loginInput);
      return res;
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
