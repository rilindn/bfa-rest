import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'
import bcrypt from 'bcrypt'

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
      unique: true,
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
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
  },
)
User.beforeUpdate(async (user: any, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 10)
  user.password = hashedPassword
})

export default User
