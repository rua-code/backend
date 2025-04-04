
import  mongoose, {model, Schema}  from 'mongoose';
const bookingSchema = new Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId,ref:"Property", required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price:{type:Number,required:true},
    paymentMethod: { type: String,enum:["palpay","credit card"],default:"palpay" },
    status : {type:String,enum:["pending", "approved", "completed"],default: "pending"}

});
const bookingModel= model('Booking',bookingSchema);
export default bookingModel;