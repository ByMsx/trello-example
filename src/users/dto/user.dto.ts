import { UserAttributes } from '../../models/user';

export class UserDto implements UserAttributes {
  id: number;
  email: string;
  passwordHash: string;
}
