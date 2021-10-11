const mongoose = require('mongoose')

const teamsInfo = new mongoose.Schema({
    team1: {
        type: String,
    },

    team2: {
        type: String,
    },
})

const gamesByDate = new mongoose.Schema({
    dateTime: {
        type: Date,
      },
    
    team: [{
        //type: [teamsInfo],
      }]
});


module.exports = mongoose.model('gamesByDate', gamesByDate)