import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'
import User from './user.model'

const Admin = sequelize.define(
  'Admin',
  {
    adminId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    isSuperAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'Admins',
    indexes: [
      {
        unique: true,
        fields: ['adminId', 'UserId'],
      },
    ],
  },
)
User.hasOne(Admin, { onDelete: 'CASCADE' })
Admin.belongsTo(User, { onDelete: 'CASCADE' })

export default Admin
