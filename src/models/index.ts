import { User } from './user';
import { Column } from './column';
import { Card } from './card';
import { Comment } from './comment';

// TODO: не вникал в тонкости sequalize, но видимо это всё вынесено в отдельный файл, чтобы не было циклической зависимости.
//  Но это всё-же это должно описываться в моделях, т.к. здесь это плохо читается
// Ответ: к сожалению, не получится. Или может я чего-то не знаю.

User.hasMany(Column, {
  foreignKey: 'ownerId',
  as: 'columns',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
User.hasMany(Comment, {
  foreignKey: 'authorId',
  as: 'comments',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Column.hasMany(Card, {
  foreignKey: 'columnId',
  as: 'cards',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Card.belongsTo(Column, {
  foreignKey: 'columnId',
  as: 'column',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Card.hasMany(Comment, {
  foreignKey: 'cardId',
  as: 'comments',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Comment.belongsTo(Card, {
  foreignKey: 'cardId',
  as: 'card',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Comment.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'author',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export { User, Column, Comment, Card };
