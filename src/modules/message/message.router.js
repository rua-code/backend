import { Router } from "express";
import { sendMessage } from "./message.controller.js";
import { auth } from "../../Middleware/auth.js";
const router = Router()
router.post('/sendMessage/:receiverId',auth(["admin","tenant","renter"]),sendMessage)
export default router
