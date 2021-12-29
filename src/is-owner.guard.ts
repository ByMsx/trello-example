import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ModelService } from './model-service.class';
import { Model } from 'sequelize';
import { HaveOwner } from './have-owner.interface';

export class IsOwnerGuard<T extends Model & HaveOwner, D extends HaveOwner>
  implements CanActivate
{
  constructor(
    private service: ModelService<T, D, any>,
    private paramName: string,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const {
        user,
        params: { [this.paramName]: itemId },
      } = context.switchToHttp().getRequest();

      if (!itemId) {
        throw new Error('Param columnId not found');
      }

      const instance = await this.service.findOne(+itemId);
      return instance.ownerId === user.id;
    }

    throw new Error('Not implemented');
  }
}
