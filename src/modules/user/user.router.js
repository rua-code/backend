import { Router } from "express";
import { addproprety, getUser } from "./user.controller.js";
import { auth } from "../../Middleware/auth.js";

const router=Router();

 router.get('/getUser',auth(["admin"]),getUser); 
//  router.get('/getUser',getUser)
router.post('/addproprety',auth(["renter"]),addproprety)
export default router;