import { Router } from "express";
import { addBooking } from "./booking.controller.js";
const router = Router()
router.post('/addBooking',addBooking)

export default router;

