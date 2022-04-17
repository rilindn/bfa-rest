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
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Users',
  },
)

export default User
