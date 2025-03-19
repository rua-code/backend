
import {Schema,model}  from 'mongoose';

const userSchema=new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmEmail: { type: Boolean, default: false },
    sendcode:{type:String,default:null},
    role:{type: String,enum:["renter","admin","tanant"] ,default:"tanant"},
});

const userModel= model('User',userSchema);
export default userModel;
