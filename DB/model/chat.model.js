import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  participants: [
    {
      ref: "User", type :Schema.Types.ObjectId,required:true
    }
  ],
  propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  lastMessage: { type: String, default: "" },
}, 
);

const chatModel = mongoose.model("Chat", chatSchema);
export default chatModel;
