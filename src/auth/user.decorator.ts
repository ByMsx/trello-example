import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export type UserFromJwt = { id: number };

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});