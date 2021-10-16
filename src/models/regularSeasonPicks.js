const mongoose = require('mongoose')

const regularSeasonPicks = new mongoose.Schema({

  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },

  matchID: {
      type: mongoose.Schema.Types.String,
      ref: 'date'
  },
  
  pick: {
    type: mongoose.Schema.Types.String,
    ref: 'pick'
},
})

module.exports = mongoose.model('RegularSeasonPicks', regularSeasonPicks)
