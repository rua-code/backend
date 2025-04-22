import { Router } from "express";
import { addRating,updateRating,getTenantRatings  } from "./rating.controller.js";
import { auth } from "../../Middleware/auth.js";
const router = Router()
 router.post('/addRating/:propertyId',auth(["tenant","renter","admin"]),addRating)
 router.patch('/updateRating/:propertyId',auth(["tenant","renter","admin"]), updateRating )
router.get('/getTenantRatings',auth(["tenant","renter","admin"]),getTenantRatings)






export default router