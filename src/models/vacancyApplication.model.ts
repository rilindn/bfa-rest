import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'
import Club from './club.model'
import User from './user.model'
import Vacancy from './vacancy.model'

const VacancyApplication = sequelize.define(
  'VacancyApplication',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
    },
  },
  {
    tableName: 'VacancyApplications',
    indexes: [
      {
        unique: true,
        fields: ['id', 'UserId', 'VacancyId'],
      },
    ],
  },
)

Vacancy.hasMany(VacancyApplication)
VacancyApplication.belongsTo(Vacancy, { onDelete: 'CASCADE' })

User.hasMany(VacancyApplication)
VacancyApplication.belongsTo(User, { onDelete: 'CASCADE' })

export default VacancyApplication
