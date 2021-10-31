const mongoose = require('mongoose')

const analysisResponseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnalysisQuestion',
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
    ref: 'AnalysisGroup'
  },
  averageScore: {
    type: Number,
    default: 0
  },
  responseCount:{
    type: Number,
    default:0
  }
})

module.exports = mongoose.model('AnalysisResponse', analysisResponseSchema)
