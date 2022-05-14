import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'
import User from './user.model'

const Follow = sequelize.define(
  'Follow',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: 'Follows',
    indexes: [
      {
        fields: ['followerId', 'followedId'],
      },
    ],
  },
)
User.belongsToMany(User, { through: Follow, as: 'Follower', onDelete: 'CASCADE', foreignKey: 'followerId' })
User.belongsToMany(User, { through: Follow, as: 'Followed', onDelete: 'CASCADE', foreignKey: 'followedId' })

export default Follow
