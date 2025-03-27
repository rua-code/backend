import { Router } from "express";//
import { addproprety } from "./property.controller.js";
import fileUplode from "../../servies/multer.js";
const router = Router()
router.post('/addproperty', fileUplode(["image/bmp", "image/jpeg", "image/png", "image/gif", "image/webp"]).array('image', 8), addproprety)
export default router


