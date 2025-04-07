import { Router } from "express";
import { addBooking, getAllBookingsForOwner, getTenantBookingDetails, tenantBookings, updateBooking, updateBookingStatus } from "./booking.controller.js";
import { auth } from "../../Middleware/auth.js";
const router = Router()
router.post('/addBooking/:propertyId',auth(["admin","renter","tenant"]),addBooking)
router.patch('/updateBooking/:bookingId',auth(["admin","renter","tenant"]),updateBooking)
router.patch('/updateBookingStatus/:bookingId',auth(["renter"]),updateBookingStatus)
router.get('/ownerBookings', auth(["renter"]), getAllBookingsForOwner);
router.get('/tenantBookings',auth(["tenant"]),tenantBookings)
router.get('/tenantBookingDetails/:bookingId',auth(["tenant"]),getTenantBookingDetails)

export default router;

