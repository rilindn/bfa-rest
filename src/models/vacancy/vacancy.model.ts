import { DataTypes } from 'sequelize'
import { sequelize } from '../../conf/postgres.config'
import Club from '../club.model'

const Vacancy = sequelize.define(
  'Vacancy',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING,
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
    ageTo: {
      type: DataTypes.INTEGER,
    },
    ageFrom: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'Vacancies',
    indexes: [
      {
        unique: true,
        fields: ['id', 'ClubId'],
      },
    ],
  },
)

Club.hasMany(Vacancy, { foreignKey: 'ClubId' })
Vacancy.belongsTo(Club, { onDelete: 'CASCADE', foreignKey: 'ClubId' })

export default Vacancy
