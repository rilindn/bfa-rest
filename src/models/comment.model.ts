import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'
import Post from './post.model'
import User from './user.model'

const Comment = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Comments',
    indexes: [
      {
        fields: ['id', 'PostId', 'UserId'],
      },
    ],
  },
)

Post.hasMany(Comment)
Comment.belongsTo(Post, { onDelete: 'CASCADE' })
User.hasMany(Comment)
Comment.belongsTo(User, { onDelete: 'CASCADE' })

export default Comment
