import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePic: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Users',
    indexes: [
      {
        unique: true,
        fields: ['id', 'email'],
      },
    ],
  },
)

export default User
