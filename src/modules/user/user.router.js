import { Router } from "express";
import { getUser } from "./user.controller.js";
const router=Router();

router.get('/getUser',getUser); 

export default router;