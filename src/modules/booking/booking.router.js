import { Router } from "express";
import { addBooking, updateBooking } from "./booking.controller.js";
import { auth } from "../../Middleware/auth.js";
const router = Router()
router.post('/addBooking/:propertyId',auth(["admin","renter","tenant"]),addBooking)
router.patch('/updateBooking/:bookingId',auth(["admin","renter","tenant"]),updateBooking)

export default router;

