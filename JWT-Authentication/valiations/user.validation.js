const Joi = require('@hapi/joi');

const userSchemaValidation = Joi.object({
    name  : Joi.string().min(6).max(255).required(),
    email : Joi.string().min(6).required().email(),
    password : Joi.string().min(6).required()
});


let validateUser = (data) => userSchemaValidation.validate(data);

module.exports={
    validateUser
}