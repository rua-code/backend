import { Router } from "express";
import { getUserChat, sendMessage } from "./message.controller.js";
import { auth } from "../../Middleware/auth.js";
const router = Router()
router.post('/sendMessage/:receiverId',auth(["admin","tenant","renter"]),sendMessage)
router.get('/getUserChat',auth(["admin","tenant","renter"]),getUserChat)
export default router
