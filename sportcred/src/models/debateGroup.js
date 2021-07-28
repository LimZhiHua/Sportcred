const mongoose = require('mongoose')

// NOTE: Unused
const debateGroupSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DebateQuestion',
    required: true
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('DebateGroup', debateGroupSchema)
