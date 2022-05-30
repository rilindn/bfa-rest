import mongoose from 'mongoose'

var ChatSchema = new mongoose.Schema(
  {
    firstUser: { type: String },
    secondUser: { type: String },
    messages: [
      {
        sender: { type: String },
        receiver: { type: String },
        content: { type: String },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'messages',
  },
)

export default mongoose.model('Chat', ChatSchema)
