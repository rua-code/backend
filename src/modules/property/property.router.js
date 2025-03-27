import { Router } from "express";//
import { addproprety, deleteProperty } from "./property.controller.js";
import fileUplode from "../../servies/multer.js";
const router = Router()
router.post('/addproperty', fileUplode(["image/bmp", "image/jpeg", "image/png", "image/gif", "image/webp"]).array('image', 8), addproprety)// location 
router.post('/updateProperty',updateProperty)
router.delete('/deleteProperty',deleteProperty)
export default router


