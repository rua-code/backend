import { Router } from "express";
import { forgetPassword, login, resetPassword, SignUp,checkCode } from "./controller/auth.controller.js";
import { confirmEmail } from "./controller/auth.controller.js";
import { forgetPasswordValidation, loginValidation, resetPasswordValidation, signUpValidation } from "./auth.validition.js";
import validation from "../../Middleware/validation.js";


const router = Router()
router.post('/signup',validation(signUpValidation),SignUp);
router.get('/confirmEmail/:token',confirmEmail)
router.post('/login',validation(loginValidation),login)
router.post('/forgetPassword',validation(forgetPasswordValidation),forgetPassword)
router.patch('/resetPassword', validation(resetPasswordValidation),resetPassword)
router.post('/checkCode',checkCode)
export default router