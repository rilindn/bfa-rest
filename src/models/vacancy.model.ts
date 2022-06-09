import { DataTypes } from 'sequelize'
import { sequelize } from '../conf/postgres.config'
import Club from './club.model'

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
    tableName: 'Vacancy',
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  },
)

Club.hasMany(Vacancy)
Vacancy.belongsTo(Club, { onDelete: 'CASCADE' })

export default Vacancy
