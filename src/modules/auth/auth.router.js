import { Router } from "express";
import { forgetPassword, login, resetPassword, SignUp } from "./controller/auth.controller.js";
import { confirmEmail } from "./controller/auth.controller.js";


const router = Router()
router.post('/signup',SignUp);
router.get('/user', (req, res)=> { 
    res.json({massage:'Hello World'})
  })
router.get('/confirmEmail/:token',confirmEmail)
router.post('/login',login)
router.post('/forgetPassword',forgetPassword)
router.patch('/resetPassword', resetPassword)
export default router