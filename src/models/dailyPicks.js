const mongoose = require('mongoose');

//https://masteringjs.io/tutorials/mongoose/timestamps

const dailyPicksSchema = new mongoose.Schema({

    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
    season: {
        type: String,
    },
    chosenTeam: {
        type: String,
    },
}, {timestamps: true});

module.exports = mongoose.model('DailyPicks', dailyPicksSchema);