import { DataTypes } from 'sequelize'
import { sequelize } from '../../conf/postgres.config'
import Club from '../club.model'

const Team = sequelize.define(
  'Team',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    division: {
      type: DataTypes.STRING,
    },
    league: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: 'Teams',
    indexes: [
      {
        unique: true,
        fields: ['id', 'ClubId'],
      },
    ],
  },
)

Club.hasOne(Team, { foreignKey: 'ClubId' })
Team.belongsTo(Club, { onDelete: 'CASCADE', foreignKey: 'ClubId' })

export default Team
