import { DataTypes } from 'sequelize'
import { sequelize } from '../../conf/postgres.config'
import Player from '../player.model'
import Team from './team.model'

const TeamPlayer = sequelize.define(
  'TeamPlayer',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'TeamPlayers',
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  },
)

Team.hasMany(TeamPlayer, { onDelete: 'CASCADE' })
TeamPlayer.belongsTo(Team, { onDelete: 'CASCADE' })

Player.hasOne(TeamPlayer, { onDelete: 'CASCADE', foreignKey: 'PlayerId' })
TeamPlayer.belongsTo(Player, { onDelete: 'CASCADE', foreignKey: 'PlayerId' })

export default TeamPlayer
