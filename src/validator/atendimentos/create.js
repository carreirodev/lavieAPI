const { validate, Joi } = require('express-validation')

module.exports = validate({
    body: Joi.object({
        paciente_id: Joi.number().required(),
        data_atendimento: Joi.string().required(),
        observacao: Joi.string().min(1).max(255).required()
    }),


});