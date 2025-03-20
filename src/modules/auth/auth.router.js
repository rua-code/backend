import { Router } from "express";
import { SignUp } from "./controller/auth.controller.js";
const router = Router()
router.post('/signup',SignUp);
// router.post('/user', (req, res)=> { 
//     res.json({massage:'Hello World'})
//   })

export default router