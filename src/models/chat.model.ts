import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: String },
    receiver: { type: String },
    content: { type: String },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const ChatSchema = new mongoose.Schema(
  {
    firstUser: { type: String },
    secondUser: { type: String },
    messages: [MessageSchema],
  },
  {
    timestamps: true,
    collection: 'chats',
  },
)

export default mongoose.model('Chat', ChatSchema)
