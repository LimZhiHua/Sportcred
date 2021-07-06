const mongoose = require('mongoose')

const debateQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  debateDay: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('DebateQuestion', debateQuestionSchema)
