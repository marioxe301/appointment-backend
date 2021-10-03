const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string()
        .required(),
    description: Joi.string(),
    appointmentDateTime: Joi.string()
        .required(),
});


module.exports = schema;