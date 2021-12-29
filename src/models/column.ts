import { Association, DataTypes, Model, Optional } from 'sequelize';
import { User } from './user';
import { sequelize } from './connection';
import { ApiProperty } from '@nestjs/swagger';

export interface ColumnAttributes {
  id: number;
  title: string;

  ownerId: number;
}

export type ColumnCreationAttributes = Optional<ColumnAttributes, 'id'>;

export class Column
  extends Model<ColumnAttributes, ColumnCreationAttributes>
  implements ColumnAttributes
{
  @ApiProperty()
  public id!: number;
  @ApiProperty()
  public title!: string;

  @ApiProperty()
  public ownerId!: number;
  public readonly owner?: User;

  @ApiProperty()
  public readonly createdAt!: Date;
  @ApiProperty()
  public readonly updatedAt!: Date;

  //TODO: не нужно перегружать модель такими методами.
  // Эту логику или напрямую в guard вынести можно, или использовать дополнительный слой в виде репозитория.
  // Вообще, если в sequalize нет такого понятия как репозиторий, можно на каждую модель создать модуль, типа такого
  /*
  @Module({
    providers: [
      {
        provide: Model.name,
        useValue: Model,
      },
      ModelRepository,
    ],
    exports: [ModelRepository],
  })
  export class ModelModule {}
*/

  // и создаем репозиторий
  /*
  @Injectable()
  export class ModelRepository {
    constructor(
      @Inject(Model.name)
      readonly model: typeof model,
    ) {} 
    ...
*/
  // В чем смысл? в сервис мы инжектируем репозиторий.
  // В репозитории можно описать дополнительную логику, например, когда нужно использовать QueryBuilder
  // И логика работы с БД получается изолированной от бизнес-логики.
  // Это замечание, скорее, на второе задание.

  public canUserEdit(userId: number): boolean {
    return this.ownerId === userId;
  }

  public static associations: {
    owner: Association<Column, User>;
  };
}

Column.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    modelName: 'Column',
    tableName: 'Columns',
    sequelize,
  },
);
