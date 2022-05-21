import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'
import Post from './post.model'
import User from './user.model'

const Like = sequelize.define(
  'Like',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'Likes',
    indexes: [
      {
        fields: ['id', 'postId', 'userId'],
      },
    ],
  },
)

Post.hasMany(Like)
User.hasMany(Like)
Like.belongsTo(User, { onDelete: 'CASCADE' })

export default Like
