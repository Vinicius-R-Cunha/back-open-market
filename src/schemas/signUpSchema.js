import joi from 'joi';

const signUpSchema = joi.object(
    {
        nome: joi.string().required(),
        email: joi.string().email().lowercase().strict().required(),
        senha: joi.string().required()
    }
);

export default signUpSchema;