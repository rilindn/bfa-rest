import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'

const Ad = sequelize.define(
  'Ad',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'Ads',
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  },
)

export default Ad
