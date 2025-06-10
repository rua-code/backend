import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "User" },  
  chatId: { type: Schema.Types.ObjectId, ref: "Chat" },    
  content: { type: String, required: true },                                      
}, 
);

export default mongoose.model("Message", messageSchema);
