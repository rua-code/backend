import { Router } from "express";
import {  getUser, updateUser,getUserById } from "./user.controller.js";
import { auth } from "../../Middleware/auth.js";

const router=Router();

 router.get('/getUser',auth(["admin","tenant","renter"]),getUser); 
//  router.get('/getUser',getUser)
// router.post('/addproprety',auth(["renter"]),addproprety)
router.patch('/updateUser/:userId',auth(["admin"]),updateUser)
router.get('/getUserById/:userId',getUserById)
export default router;