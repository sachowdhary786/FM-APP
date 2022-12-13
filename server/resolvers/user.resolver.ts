import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { LoginInput, LoginResponse, SignUpInput, UserResponse } from '../schemas/user.schema';
import UserService from '../services/user.service';
import type { Context } from '../types/context';

@Resolver()
export default class UserResolver {
  // eslint-disable-next-line no-unused-vars
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => UserResponse)
  async signUpUser(@Arg('input') input: SignUpInput) {
    return this.userService.signUpUser(input)
  }

  @Mutation(() => LoginResponse)
  async loginUser(@Arg('input') loginInput: LoginInput, @Ctx() ctx: Context) {
    return this.userService.loginUser(loginInput, ctx);
  }

  @Query(() => LoginResponse)
  async refreshAccessToken(@Ctx() ctx: Context) {
    return this.userService.refreshAccessToken(ctx);
  }

  @Query(() => Boolean)
  async logoutUser(@Ctx() ctx: Context) {
    return this.userService.logoutUser(ctx)
  }
}