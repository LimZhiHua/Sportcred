const mongoose = require("mongoose")

const postCommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.String,
        default: "",
        ref: 'User'
      },

    text: {
      type: String,
      required: true,
      min: 5,
      max: 1000
    },

    createdAt: {
      type: Date, 
      default: Date.now
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    authorId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
})

module.exports = mongoose.model("PostComment", postCommentSchema)