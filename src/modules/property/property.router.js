import { Router } from "express";//
import { addproprety, deleteProperty, updateProperty } from "./property.controller.js";
import fileUplode from "../../servies/multer.js";
import { auth } from "../../Middleware/auth.js";
import validation from "../../Middleware/validation.js";
import { addPropertySchema, updatePropertySchema } from "./property.validation.js";
const router = Router()
router.post('/addproperty',  auth(["renter"]),fileUplode(["image/bmp", "image/jpeg", "image/png", "image/gif", "image/webp"]).array('image', 8),validation(addPropertySchema),addproprety)// location 
router.patch('/updateProperty/:propertyId',auth(["renter"]),fileUplode(["image/bmp", "image/jpeg", "image/png", "image/gif", "image/webp"]).array('image', 8),validation(updatePropertySchema),updateProperty)
router.delete('/deleteProperty/:propertyId',auth(["renter","admin"]),deleteProperty)
export default router


