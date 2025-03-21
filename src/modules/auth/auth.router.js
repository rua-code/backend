import { Router } from "express";
import { login, SignUp } from "./controller/auth.controller.js";
import { confirmEmail } from "./controller/auth.controller.js";


const router = Router()
router.post('/signup',SignUp);
// router.post('/user', (req, res)=> { 
//     res.json({massage:'Hello World'})
//   })
router.get('/confirmEmail/:email',confirmEmail)
router.get('/login',login)
export default router