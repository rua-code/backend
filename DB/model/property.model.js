import {Schema}  from 'mongoose';
const propertySchema= new Schema({
    location: {
        type: [Number], 
        required: true
    },
    ownerId: { type:mongoose.Schema.Types.ObjectId ,ref:"user",  required: true },
    image: [{ type: String }],
    price: { type: Number, required: true },
    address: { type: String, required: true },
    propertyType: { type: String,enum :['apartment', 'studio', 'house', 'room', 'retrats'] ,required: true },
    area: { type: Number, required: true },
    numberRoom: { type: Number, required: true },
    title: { type: String, required: true },
    status : {type:String,enum:["pending ", "approved ", "completed "],default: "pending"}

});
//export 