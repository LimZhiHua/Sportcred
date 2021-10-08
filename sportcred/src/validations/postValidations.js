const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const   postValidation = (data) => {

  const schema = Joi.object({
    title: Joi.string().min(5).max(250).required(),
    description: Joi.string().min(5).max(1000).required(),
    authorId:Joi.objectId()
  })

  return schema.validate(data)
}

module.exports.postValidation = postValidation;