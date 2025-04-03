import { Router } from "express";//
import { addproprety, deleteProperty, updateProperty } from "./property.controller.js";
import fileUplode from "../../servies/multer.js";
import { auth } from "../../Middleware/auth.js";
const router = Router()
router.post('/addproperty',  auth(["renter"]),fileUplode(["image/bmp", "image/jpeg", "image/png", "image/gif", "image/webp"]).array('image', 8),addproprety)// location 
router.patch('/updateProperty/:propertyId',auth(["renter"]),fileUplode(["image/bmp", "image/jpeg", "image/png", "image/gif", "image/webp"]).array('image', 8),updateProperty)
router.delete('/deleteProperty/:propertyId',auth(["renter","admin"]),deleteProperty)
export default router


