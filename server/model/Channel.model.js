import mongoose from 'mongoose'

const channelShema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  listOfUsers: {
    type: Array,
    required: true
  },
  listOfMessages: {
    type: Array,
    required: true
  }
})

export default mongoose.model('channels', channelShema)
