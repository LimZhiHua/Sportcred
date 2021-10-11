const mongoose = require('mongoose')
// const triviaPlayer = require("./_triviaPlayer")

const triviaPlayer = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    totalScore: {
        type: Number,
        default: 0
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('triviaPlayer', triviaPlayer);
