import { db } from "../../servies/firebase.js";
import chatModel from "../../../DB/model/chat.model.js";
import userModel from "../../../DB/model/user.model.js";
import propertyModel from "../../../DB/model/property.model.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const { receiverId } = req.params;
    const { message, propertyId } = req.body;

    if (!message || !receiverId || !propertyId) {
      return res.status(400).json({ message: "Missing data" });
    }

 
    let chat = await chatModel.findOne({
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
    } 
      // 3. Update lastMessage
      chat.lastMessage = message;
      await chat.save();
    

    const chatId = chat._id.toString(); //toString()  من ObjectId إلى نص (String) because fire base dose not support objectid

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
    await db.ref(`chat/${chatId}/lastMessage`).set({
      message,
      senderId,
      chatId,
      receiverId
    });

    return res.status(200).json({ message: "Message sent", chatId });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserChat = async (req, res) => {
  try {
    const senderId = req.id; // جاي من التوكن

    // جيب كل المحادثات اللي المستخدم طرف فيها
    const chats = await chatModel.find({
      participants: { $all: [senderId] }
    });

    const firebaseChat = [];
    let lastMessage;

    for (const chat of chats) {// chat id from mongodb 
      const chatID = chat._id
      const pathofReading = db.ref(`chat/${chatID}/lastMessage`)
      const read = await pathofReading.once("value")//reading from fire base
      lastMessage = read.val();
      if (!lastMessage) continue; 
      const sender=await userModel.findById(lastMessage.senderId).select("-password -confirmEmail -sendcode");
      const receiver=await userModel.findById(lastMessage.receiverId).select("-password -confirmEmail -sendcode");
      const property=await propertyModel.findById(chat.propertyId);
      firebaseChat.push({ lastMessage,property:property,sender:sender,receiver:receiver});

    }


 
    return res.status(200).json({ firebaseChat });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
