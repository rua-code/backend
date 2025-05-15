import  mongoose, {model, Schema}  from 'mongoose';

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
    publicId:   [{ type: String }],
    ownerId: { type:mongoose.Schema.Types.ObjectId ,ref:"User",  required: true },
    image: [{ type: String}],
    price: { type: Number, required: true },
    address: { type: String, required: true },
    propertyType: { type: String,enum :['apartment', 'studio', 'student dorm', 'vaills'] ,required: true },
    area: { type: Number, required: true },
    numberRoom: { type: Number, required: true },
    title: { type: String, required: true },
    status : {type:String,enum:["pending", "approved","canceld"],default: "pending"},
    note :{
        type:String,
        default :"سيتم مراجعة الطلب "

    },
    ratingCounts: {
        "1": { type: Number, default: 0 },
        "2": { type: Number, default: 0 },
        "3": { type: Number, default: 0 },
       "4": { type: Number, default: 0 },
       "5": { type: Number, default: 0 }
      }
      

});
propertySchema.index({location:'2dsphere'});
const propertyModel= model('Property',propertySchema);
export default propertyModel;