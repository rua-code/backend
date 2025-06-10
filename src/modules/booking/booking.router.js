import { Router } from "express";
import { addBooking, getAllBookings, getAllBookingsForOwner, getCompletedBookings, getTenantBookingDetails, tenantBookings, updateBooking, updateBookingStatus } from "./booking.controller.js";
import { auth } from "../../Middleware/auth.js";
const router = Router()
router.post('/addBooking/:propertyId',auth(["admin","renter","tenant"]),addBooking)
router.patch('/updateBooking/:bookingId',auth(["admin","renter","tenant"]),updateBooking)
router.patch('/updateBookingStatus/:bookingId',auth(["renter","admin"]),updateBookingStatus)
router.get('/ownerBookings', auth(["renter","admin"]), getAllBookingsForOwner);
//propertyid, user id(token) => booking status "completed"
router.get('/getcompletedBookings/:propertyId',auth(["renter","admin","tenant"]),getCompletedBookings)
router.get('/tenantBookings',auth(["tenant","renter","admin"]),tenantBookings)
router.get('/tenantBookingDetails/:bookingId',auth(["tenant","renter","admin"]),getTenantBookingDetails)
router.get('/getallBookings',auth(["admin"]),getAllBookings)
export default router;

