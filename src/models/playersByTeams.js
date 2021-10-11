const mongoose = require('mongoose')

const playersByTeams = new mongoose.Schema({
    team: {
        type: String,
      },
    
    players: [{
        type: String,
      }]
});

module.exports = mongoose.model('playersByTeams', playersByTeams)