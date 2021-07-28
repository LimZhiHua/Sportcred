const mongoose = require('mongoose')

const analysisQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  scheduledDay: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('AnalysisQuestion', analysisQuestionSchema)
