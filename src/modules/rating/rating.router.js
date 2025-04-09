import { Router } from "express";
import { addRating } from "./rating.controller.js";
import { auth } from "../../Middleware/auth.js";
const router = Router()
 router.post('/addRating/:propertyId',auth(["tenant"]),addRating)








export default router