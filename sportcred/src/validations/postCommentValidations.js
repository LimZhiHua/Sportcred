const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const postCommentValidation = (data) => {

  const schema = Joi.object({
    text: Joi.string().min(5).max(1000).required(),
    author_id: Joi.objectId()
  })

  return schema.validate(data)
}

module.exports.postCommentValidation = postCommentValidation;