const mongoose = require('mongoose')

const analysisVoteSchema = new mongoose.Schema({
  responseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnalysisResponse',
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

module.exports = mongoose.model('AnalysisVote', analysisVoteSchema)
