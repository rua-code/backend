/// joi 
//username,email,passworimport Joi from "joi";

import Joi from "joi";
import validation from "../../Middleware/validation.js";


export const signUpValidation = 
    Joi.object({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })

export const loginValidation  = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    export const resetPasswordValidation = Joi.object({
            email: Joi.string().email().required(),
            code: Joi.string().required(),
            password: Joi.string().min(6).required()
        });
    

        export const forgetPasswordValidation = Joi.object({
                email: Joi.string().email().required(),
            });
        
