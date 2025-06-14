
import {Schema,model}  from 'mongoose';

const userSchema=new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmEmail: { type: Boolean, default: false },
    sendcode:{type:String,default:null},
    role:{type: String,enum:["renter","admin","tenant"] ,default:"tenant"},
    idNo:{type: String,required: true},
    birthDate:{type: String,required: true},
   
});

//user=> collection name in mongo 
//model =>lib from mongooes helps me to create collection 
//userschema=> defins what fildes will be in mongo 
//schem=>strctuer ,model(crud)
const userModel= model('User',userSchema);
export default userModel;
