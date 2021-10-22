const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

    title: {
        type: String,
        required: true,
        min: 5,
        max: 250
    },

    description: { 
        type: String,
        required: true,
        min: 5,
        max: 1000
    },

    createdAt: {
        type: Date, 
        default: Date.now
    },

    numComments: {
        type: Number,
        default: 0
    },

    likes:{
        type: mongoose.Schema.Types.Array,
        ref: "likes",
        default: []
      },

    dislikes:{
        type: mongoose.Schema.Types.Array,
        ref: "dislikes",
        default: []
    },
    author:{
        type: mongoose.Schema.Types.String,
        ref: "author",
        default: []
    },

})

module.exports = mongoose.model("Post", postSchema)
