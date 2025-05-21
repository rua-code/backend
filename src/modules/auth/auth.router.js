import { Router } from "express";
import { forgetPassword, login, resetPassword, SignUp,checkCode,newPassword } from "./controller/auth.controller.js";
import { confirmEmail } from "./controller/auth.controller.js";
import { forgetPasswordValidation, loginValidation, newPasswordValidation, resetPasswordValidation, signUpValidation } from "./auth.validition.js";
import validation from "../../Middleware/validation.js";
// import { auth } from "firebase-admin";
import { auth } from "../../Middleware/auth.js";


const router = Router()
router.post('/signup',validation(signUpValidation),SignUp);
router.get('/confirmEmail/:token',confirmEmail)
router.post('/login',validation(loginValidation),login)
router.post('/forgetPassword',validation(forgetPasswordValidation),forgetPassword)
router.patch('/resetPassword', validation(resetPasswordValidation),resetPassword)
router.patch('/newPassword',auth(["admin","tenant","renter"]),newPassword)
router.post('/checkCode',checkCode)
export default router