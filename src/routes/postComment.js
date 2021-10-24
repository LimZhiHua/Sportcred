const express = require('express');
const router = express.Router({ mergeParams: true });
const Post = require('../models/post')
const User = require('../models/user')

const PostComment = require('../models/postComment');
const {postCommentValidation} = require('../validations/postCommentValidations');

 /**
 * @swagger
 * /post/{id}/postComment:
 *   post:
 *     summary: Comment on post.
 *     description: Adds a comment to a post.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to comment on.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The comment
 *     tags:
 *      - post
 *     responses:
 *       400:
 *         description: Invalid request.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Cannot add comment to post.
 *       200:
 *         description: Success.
*/
router.post('/postComment', async (req, res) => {
  console.log("making new post comment route")
  console.log("body is", req.body)
  
  // Front end validations
  const {error} = postCommentValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("making new post comment route")

  // Find post
  const foundPost = await Post.findById(req.params.id)
    .catch((err) => {
        return res.status(400).send(err)
    })
  if (foundPost === null) {
    return res.status(404).send("foundPost is null");  
  }
  console.log("post is", foundPost)

  // Create postComment
  const newPostComment = {
    //   author: {
    //       id: req.body.userId
    //   },
    text: req.body.text,
    postId: req.params.id,
    authorId: req.body.author_id,
    author:""
  }

  try{
    // Save postComment
    const postComment = new PostComment(newPostComment);
    await postComment.save();

    // Update post's comment count
    foundPost.numComments += 1;
    await foundPost.save();
    console.log("incrementing the number of fond posts")
    return res.status(200).send("postComment saved")
  } catch(err){
    console.log(err)
    return res.status(500).send('error creating postComment');
  }
});

 /**
 * @swagger
 * /post/{id}/comments:
 *   get:
 *     summary: Get comments for the post.
 *     description: Gets comments for the post.
 *     tags:
 *      - post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         default: 100
 *         description: Get the most recent limit of responses
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         default: 1
 *         description: The page of responses sized according to the limit
 *         schema:
 *           type: integer
 *     responses:
 *       500:
 *         description: Error getting comments.
 *       200:
 *         description: List of comments for the post.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                $ref: '#/components/schemas/PostComment'
*/
router.get('/comments', async (req, res) => {
  const limit     = Math.abs(parseInt(req.query.limit)) || 5;
  const page      = Math.abs(parseInt(req.query.page)) - 1 || 0;
  let allComments  = await PostComment
                    .find({postId: req.params.id})
                    .sort({_id: -1})
                    .skip(page*limit)
                    .limit(limit)
                    .catch((error) => {
                      return res.status(500).send("error getting comments")
                  });
  let allCommentsUpdated = await  Promise.all(
    allComments.map( async (comment) =>{
      const username =  (await User.findOne({_id: comment.authorId})).username
      let newComment = comment
      newComment["author"] = username
      return newComment
    }))
  
  try {
    return res.status(200).send({ commentsArray: allComments });
  } catch (err) {
    return res.status(500).send(err)
  }
});

module.exports = router;