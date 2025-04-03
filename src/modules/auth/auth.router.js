import { Router } from "express";
import { forgetPassword, login, resetPassword, SignUp } from "./controller/auth.controller.js";
import { confirmEmail } from "./controller/auth.controller.js";
import { forgetPasswordValidation, loginValidation, resetPasswordValidation, signUpValidation } from "./auth.validition.js";
import validation from "../../Middleware/validation.js";


const router = Router()
router.post('/signup',validation(signUpValidation),SignUp);
router.get('/confirmEmail/:token',validation(loginValidation),confirmEmail)
router.post('/login',login)
router.post('/forgetPassword',validation(forgetPasswordValidation),forgetPassword)
router.patch('/resetPassword', validation(resetPasswordValidation),resetPassword)
export default router