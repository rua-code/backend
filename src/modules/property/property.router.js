import { Router } from "express";//
import { addproprety, deleteProperty, findNear, getallProperty, getapprovedtProperty, getProperty, getPropertybyid, updateProperty, updatePropertyByBelal, updateStatus } from "./property.controller.js";
import fileUplode from "../../servies/multer.js";
import { auth } from "../../Middleware/auth.js";
import validation from "../../Middleware/validation.js";
import { addPropertySchema, updatePropertySchema } from "./property.validation.js";
const router = Router()
router.post('/addproperty',  auth(["renter","admin"]),fileUplode(["image/bmp", "image/jpeg", "image/png", "image/gif", "image/webp"]).array('image', 8),validation(addPropertySchema),addproprety)// location 
router.patch('/updateProperty/:propertyId',auth(["renter"]),fileUplode(["image/bmp", "image/jpeg", "image/png", "image/gif", "image/webp"]).array('image', 8),validation(updatePropertySchema),updatePropertyByBelal)
router.patch('/updatePropertyByBelal/:propertyId',auth(["renter","admin"]),updatePropertyByBelal)

router.delete('/deleteProperty/:propertyId',auth(["renter","admin"]),deleteProperty)
router.get('/findNear',findNear)
router.patch('/updatestatus/:propertyId',auth(["admin"]), updateStatus)
router.get("/getProperty/:propertyId",getProperty)
router.get("/getallProperty",auth(["admin"]),getallProperty)
router.get("/getapprovedproperty",getapprovedtProperty)
router.get("/getpropertybyid/:ownerId",auth(["renter","admin"]),getPropertybyid)
export default router
//بدي ارجع من قاعدى البياتاات get
//post تخزين بقاعدة البيانات
// patch تعديل على البيانات
