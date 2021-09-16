const mongoose = require('mongoose')

//https://masteringjs.io/tutorials/mongoose/timestamps

const regularPicksSchema = new mongoose.Schema({

    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
    mvp: {
        type: String,
    },
    mostImprovedPlayer: { 
        type: String,
    },
    defensivePlayer: {
        type: String,
    },
    season: {
        type: String,
    },
}, {timestamps: true});

module.exports = mongoose.model('RegularPicks', regularPicksSchema)
