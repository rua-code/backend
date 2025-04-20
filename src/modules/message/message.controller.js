import { db } from "../../servies/firebase.js";
import chatModel from "../../../DB/model/chat.model.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const { receiverId } = req.params;
    const { message, propertyId } = req.body;
    
    if (!message || !receiverId || !propertyId) {
      return res.status(400).json({ message: "Missing data" });
    }
  
    // 1. Check if chat exists
    // const propertyID =propertyId.toString();
    // const senderID= senderId.toString();
    // const receiverID= receiverId.toString();
    // console.log(propertyID)
  const chat = await chatModel.findOne({
      participants: { $all: [senderId, receiverId] },
      propertyId,
    });
    
  
    // 2. If not exists, create it
    if (!chat) {
      chat = await chatModel.create({
        participants: [senderId, receiverId],
        propertyId,
        lastMessage: message,
      });
    } else {
      // 3. Update lastMessage
      chat.lastMessage = message; 
      await chat.save();
    }

    const chatId = chat._id.toString(); //toString() يحوّله من ObjectId إلى نص (String) because fire base dose not support objectid

    // 4. Push message to Firebase
    const messageRef = db.ref(`chat/${chatId}/messages`).push();
    const messageData = {
      senderId,
      receiverId,
      message,
      timestamp: Date.now(),
    };
    await messageRef.set(messageData);

    // 5. Update lastMessage in Firebase too
    await db.ref(`chat/${chatId}/lastMessage`).set(message);//db ref ,, message ref ??

    return res.status(200).json({ message: "Message sent", chatId });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
