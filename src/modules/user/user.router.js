import { Router } from "express";
import {  getUser, updateUser,getUserById, addRenter, getUserRequest } from "./user.controller.js";
import { auth } from "../../Middleware/auth.js";

const router=Router();

 router.get('/getUser',auth(["admin","tenant","renter"]),getUser); 

router.patch('/updateUser/:reqId',auth(["admin"]),updateUser)
router.get('/getUserById/:userId',getUserById)
router.post('/requsertToChangeRole',auth(["tenant"]),addRenter)
router.get('/getRequestToChangeRole',auth(["admin"]),getUserRequest)
export default router;