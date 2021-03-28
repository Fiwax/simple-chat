import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    userPic: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    currentChannel: {
      type: String,
      required: true
    },
    meta: {
      type: Object,
      default: {},
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('messages', messageSchema)
