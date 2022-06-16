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
  },
  {
    tableName: 'Likes',
    indexes: [
      {
        fields: ['id', 'PostId', 'UserId'],
      },
    ],
  },
)

Post.hasMany(Like, { onDelete: 'CASCADE' })
Like.belongsTo(Post, { onDelete: 'CASCADE' })
User.hasMany(Like, { onDelete: 'CASCADE' })
Like.belongsTo(User, { onDelete: 'CASCADE' })

export default Like
