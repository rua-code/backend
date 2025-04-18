import { Router } from "express";
import { addRating,updateRating,getTenantRatings  } from "./rating.controller.js";
import { auth } from "../../Middleware/auth.js";
const router = Router()
 router.post('/addRating/:propertyId',auth(["tenant"]),addRating)
 router.patch('/updateRating/:propertyId',auth(["tenant"]), updateRating )
router.get('getTenantRatings',auth(["tenant"]),getTenantRatings)






export default router