import { sequelize } from '../conf/postgres.config'
import { DataTypes } from 'sequelize'
import User from './user.model'
import Post from './post.model'

const PostReport = sequelize.define(
  'PostReport',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'PostReports',
    indexes: [
      {
        unique: true,
        fields: ['id', 'reporterId', 'postId'],
      },
    ],
  },
)

User.hasMany(PostReport, { onDelete: 'CASCADE', foreignKey: 'reporterId' })
PostReport.belongsTo(User, { onDelete: 'CASCADE', foreignKey: 'reporterId' })

Post.hasMany(PostReport, { onDelete: 'CASCADE', foreignKey: 'postId' })
PostReport.belongsTo(Post, { onDelete: 'CASCADE', foreignKey: 'postId' })

export default PostReport
