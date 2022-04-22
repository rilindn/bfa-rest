import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'
import User from './user.model'

const Player = sequelize.define(
  'Player',
  {
    playerId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    zipCode: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    placeOfBirth: {
      type: DataTypes.STRING,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    openForTransfer: {
      type: DataTypes.BOOLEAN,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    height: {
      type: DataTypes.FLOAT,
    },
    foot: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    secondPosition: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Players',
    indexes: [
      {
        unique: true,
        fields: ['playerId'],
      },
    ],
  },
)

User.hasOne(Player)
Player.belongsTo(User)

export default Player
