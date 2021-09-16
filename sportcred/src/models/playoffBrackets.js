const mongoose = require('mongoose');

//https://masteringjs.io/tutorials/mongoose/timestamps

const playoffBracketsSchema = new mongoose.Schema({

    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
    season: {
        type: String,
    },
    westernConference_4: [{
        team1: String,
        team2: String,
        team3: String,
        team4: String,
    }],
    easternConference_4: [{
        team1: String,
        team2: String,
        team3: String,
        team4: String,
    }],
    westernConferenceChampion: [{
        team1: String,
        team2: String,
    }],
    easternConferenceChampion: [{
        team1: String,
        team2: String,
    }],
    champions: [{
        team1: String,
        team2: String,
    }],
    champion: {
        type: String,
    }
}, {timestamps: true});

module.exports = mongoose.model('PlayoffBrackets', playoffBracketsSchema);