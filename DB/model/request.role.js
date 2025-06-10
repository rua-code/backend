
import {Schema,model}  from 'mongoose';

const userSchema=new Schema({
    userId : { type: Schema.Types.ObjectId,ref:"User", required: true },
    role:{type: String,enum:["renter","admin","tenant"] ,default:"tenant"},
    status: { type: String,enum:["pending", "approved","canceld"], default: "pending" },
});

const userRoleModel= model('UserRole',userSchema);
export default userRoleModel;
