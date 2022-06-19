import { sequelize } from '../conf/postgres.config'
import { DataTypes } from 'sequelize'
import Player from './player.model'
import Post from './post.model'
import User from './user.model'

const Bookmark = sequelize.define(
  'Bookmark',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    referenceType: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'Bookmarks',
    indexes: [
      {
        unique: true,
        fields: ['id', 'bookmarkerId'],
      },
    ],
  },
)

User.hasMany(Bookmark, { onDelete: 'CASCADE', foreignKey: 'bookmarkerId' })
Bookmark.belongsTo(User, { onDelete: 'CASCADE', foreignKey: 'bookmarkerId' })

Player.hasMany(Bookmark, { onDelete: 'CASCADE', foreignKey: 'referencedPlayer' })
Bookmark.belongsTo(Player, { onDelete: 'CASCADE', foreignKey: 'referencedPlayer' })

Post.hasMany(Bookmark, { onDelete: 'CASCADE', foreignKey: 'referencedPost' })
Bookmark.belongsTo(Post, { onDelete: 'CASCADE', foreignKey: 'referencedPost' })

export default Bookmark
