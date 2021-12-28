import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ColumnsService } from "./columns.service";

@Injectable()
export class IsColumnOwnerGuard implements CanActivate {
  constructor(private columnsService: ColumnsService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const { user, params: { columnId } } = context.switchToHttp().getRequest();

      if (!columnId) {
        throw new Error('Param columnId not found');
      }

      await this.columnsService.findOneAndCheckAccess(+columnId, user.id);

      return true;
    }

    throw new Error('Not implemented');
  }
}