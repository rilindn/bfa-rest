import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'

const ResetCode = sequelize.define(
  'ResetCode',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiration: {
      type: DataTypes.DATE,
      defaultValue: new Date(new Date().getTime() + 60 * 60 * 1000),
    },
  },
  {
    tableName: 'ResetCodes',
    indexes: [
      {
        fields: ['id', 'email'],
      },
    ],
  },
)

export default ResetCode
