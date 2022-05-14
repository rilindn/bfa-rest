import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'
import User from './user.model'

const Follow = sequelize.define(
  'Follow',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    followerId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
    },
    followedId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
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
User.belongsToMany(User, { through: Follow, as: 'Follower', onDelete: 'CASCADE' })
User.belongsToMany(User, { through: Follow, as: 'Followed', onDelete: 'CASCADE' })

export default Follow
