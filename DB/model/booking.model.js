
import  mongoose, {model, Schema}  from 'mongoose';
const bookingSchema = new Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId,ref:"Property", required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    // paymentMethod: { type: String,enum:["cash","credit card"],default:"cash" },
    status : {type:String,enum:["pending", "approved", "completed","canceld"],default: "pending"},
    note :{
        type:String,
        default :"سيتم مراجعة الطلب "

    }
});
const bookingModel= model('Booking',bookingSchema);
export default bookingModel;

