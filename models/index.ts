import { User } from './user';
import { Column } from './column';
import { Card } from './card';
import { Comment } from "./comment";

User.hasMany(Column, { foreignKey: 'ownerId', as: 'columns', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.hasMany(Comment, { foreignKey: 'authorId', as: 'comments', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Column.hasMany(Card, { foreignKey: 'columnId', as: 'cards', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Card.belongsTo(Column, { foreignKey: 'columnId', as: 'column', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Card.hasMany(Comment, { foreignKey: 'cardId', as: 'comments', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Comment.belongsTo(Card, { foreignKey: 'cardId', as: 'card', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'authorId', as: 'author', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export { User, Column, Comment, Card };
