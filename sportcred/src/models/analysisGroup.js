const mongoose = require('mongoose')

// NOTE: Unused
const analysisGroupSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnalysisQuestion',
    required: true
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('AnalysisGroup', analysisGroupSchema)
