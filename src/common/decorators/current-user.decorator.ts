import { RequestWithUser } from '@common/interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  }
);

export default CurrentUser;
