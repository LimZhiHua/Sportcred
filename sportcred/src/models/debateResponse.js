const mongoose = require('mongoose')

const debateResponseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DebateQuestion',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  response: {
    type: String,
    required: true
  },
  // NOTE: Unused
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DebateGroup'
  },
  averageScore: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('DebateResponse', debateResponseSchema)
