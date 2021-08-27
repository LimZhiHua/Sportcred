const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const { postValidation, getPostValidation } = require('../validations/postValidations');

 /**
 * @swagger
 * /post:
 *   get:
 *     summary: Get all posts.
 *     description: Gets all posts.
 *     tags:
 *      - post
 *     parameters:
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
 *         description: Error getting posts.
 *       200:
 *         description: List of all posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                $ref: '#/components/schemas/Post'
*/
router.get('/', async (req, res) => {
  const limit     = Math.abs(parseInt(req.query.limit)) || 100;
  const page      = Math.abs(parseInt(req.query.page)) - 1 || 0;
  const allPosts  = await Post
                    .find({})
                    .skip(page*limit)
                    .limit(limit)
                    .catch((error) => {
                      return res.status(500).send("error getting all posts")
                  });
  
  let postsArray = [];
  allPosts.forEach(post => { postsArray.push(post) });

  try {
    return res.status(200).send({ postsArray: postsArray });
  } catch (err) {
    return res.status(500).send(err)
  }
});

 /**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new post.
 *     description: Create a new post.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post.
 *                 example: My amazing post of 2021
 *               description:
 *                 type: string 
 *                 description: The body of of the post.
 *     tags:
 *      - post
 *     responses:
 *       400:
 *         description: Invalid request.
 *       500:
 *         description: Error creating the post.
 *       200:
 *         description: List of all posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: string 
*/
router.post('/', async (req, res) => {
  // Front end validations
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create post
  const newPost = {
    //   author: {
    //       id: req.body.userId
    //   },
    title: req.body.title,
    description: req.body.description
  }

  try {
    const post = new Post(newPost);

    await post.save();
    return res.status(200).send({ post: post._id })

  } catch (err) {
    return res.status(500).send('error creating post');

  }

});

 /**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get a post.
 *     description: Returns a post based on ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to retrieve.
 *         schema:
 *           type: string
 *     tags:
 *      - post
 *     responses:
 *       500:
 *         description: Error getting the post.
 *       200:
 *         description: List of all posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Post'
*/
router.get("/:id", async (req, res) => {
  console.log("hello there " + req.params.id)
  const foundPost = await Post
    .findOne({_id: req.params.id})
    .catch((err) => {
      return res.status(400).send(err)
    })

  if (!foundPost) 
    return res.status(500).send(err)
  else
    return res.status(200).send(foundPost)
})

module.exports = router;
