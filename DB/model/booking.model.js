import  mongoose, {model, Schema}  from 'mongoose';
const bookingSchema = new Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId,ref:"Property", required: true },
    tenantId: { type:Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    paymentMethod: { type: String, required: true },
    status : {type:String,enum:["pending ", "approved ", "completed "],default: "pending"}

});
const bookingModel= model('Booking',bookingSchema);
export default bookingModel;