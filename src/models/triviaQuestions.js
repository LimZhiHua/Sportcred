const mongoose = require('mongoose')

const triviaQuestions = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.String,
    required: true,
    default: ""
  },
  star:{
      type: mongoose.Schema.Types.String,
      default: ""
  },
  question:{
    type: mongoose.Schema.Types.String,
    default: ""
  },
  answer:{
    type: mongoose.Schema.Types.String,
    default: ""
  },
  choices:{
    type: [String],
    default:[]
  }

})

module.exports = mongoose.model('triviaQuestions', triviaQuestions)
