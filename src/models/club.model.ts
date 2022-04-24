import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'
import User from './user.model'

const Club = sequelize.define(
  'Club',
  {
    clubId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    clubName: {
      type: DataTypes.STRING,
    },
    clubLogo: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'Clubs',
    indexes: [
      {
        unique: true,
        fields: ['clubId'],
      },
    ],
  },
)
User.hasOne(Club, { onDelete: 'CASCADE' })
Club.belongsTo(User)

export default Club
