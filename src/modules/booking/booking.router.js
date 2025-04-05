import { Router } from "express";
import { addBooking, getAllBookingsForOwner, updateBooking, updateBookingStatus } from "./booking.controller.js";
import { auth } from "../../Middleware/auth.js";
const router = Router()
router.post('/addBooking/:propertyId',auth(["admin","renter","tenant"]),addBooking)
router.patch('/updateBooking/:bookingId',auth(["admin","renter","tenant"]),updateBooking)
router.patch('/updateBookingStatus/:bookingId',auth(["renter"]),updateBookingStatus)
router.get('/ownerBookings', auth(["renter"]), getAllBookingsForOwner);


export default router;

