import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'
import User from './user.model'

const Post = sequelize.define(
  'Post',
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
    media: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Posts',
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  },
)

User.hasMany(Post)
Post.belongsTo(User, { onDelete: 'CASCADE' })

export default Post
