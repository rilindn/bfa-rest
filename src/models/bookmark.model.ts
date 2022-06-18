import { sequelize } from '../conf/postgres.config'
import { DataTypes } from 'sequelize'
import Player from './player.model'
import Club from './club.model'
import Post from './post.model'

const Bookmark = sequelize.define(
  'Bookmark',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referenceType: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Bookmark',
    indexes: [
      {
        unique: true,
        fields: ['id', 'PlayerId', 'ClubId', 'PostId'],
      },
    ],
  },
)

Player.hasMany(Bookmark, {foreignKey: 'PlayerId'})
Bookmark.belongsTo(Player, { onDelete: 'CASCADE', foreignKey: 'PlayerId'})

Club.hasMany(Bookmark, {foreignKey: 'ClubId'})
Bookmark.belongsTo(Club, { onDelete: 'CASCADE', foreignKey: 'ClubId'})

Post.hasMany(Bookmark, {foreignKey: 'PostId'})
Bookmark.belongsTo(Post, { onDelete: 'CASCADE', foreignKey: 'PostId'})

export default Bookmark