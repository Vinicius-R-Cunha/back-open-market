import joi from 'joi';

const signInSchema = joi.object(
    {
        email: joi.string().email().lowercase().strict().required(),
        senha: joi.string().required()
    }
);

export default signInSchema;