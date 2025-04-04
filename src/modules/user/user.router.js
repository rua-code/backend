import { Router } from "express";
import {  getUser, updateUser } from "./user.controller.js";
import { auth } from "../../Middleware/auth.js";

const router=Router();

 router.get('/getUser',auth(["admin"]),getUser); 
//  router.get('/getUser',getUser)
// router.post('/addproprety',auth(["renter"]),addproprety)
router.patch('/updateUser/:userId',auth(["admin"]),updateUser)
export default router;