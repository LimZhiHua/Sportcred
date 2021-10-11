const mongoose = require('mongoose')

const pickSchema = new mongoose.Schema({

  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },

  topicName: {
      type: mongoose.Schema.Types.String,
      ref: 'PickTopic'
  },

  pick: {
    type: String,
  },

  year:{
    type: mongoose.Schema.Types.Number,
  }
})

module.exports = mongoose.model('picks', pickSchema)
