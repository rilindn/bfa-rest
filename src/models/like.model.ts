import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'
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
        fields: ['id'],
      },
    ],
  },
)

User.hasMany(Like)
Like.belongsTo(User, { onDelete: 'CASCADE' })

export default Like
