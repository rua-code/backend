import {Schema}  from 'mongoose';
const propertySchema= new Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {  
            type: [Number],  // [longitude, latitude]
            required: true
        }
    },
    ownerId: { type:mongoose.Schema.Types.ObjectId ,ref:"User",  required: true },
    image: [{ type: String }],
    price: { type: Number, required: true },
    address: { type: String, required: true },
    propertyType: { type: String,enum :['apartment', 'studio', 'house', 'room', 'retrats'] ,required: true },
    area: { type: Number, required: true },
    numberRoom: { type: Number, required: true },
    title: { type: String, required: true },
    status : {type:String,enum:["pending ", "approved ", "completed "],default: "pending"}

});
const propertyModel= model('Property',propertySchema);
export default propertyModel;