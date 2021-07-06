const mongoose = require('mongoose')

const debateVoteSchema = new mongoose.Schema({
  responseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DebateResponse',
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})

module.exports = mongoose.model('DebateVote', debateVoteSchema)
