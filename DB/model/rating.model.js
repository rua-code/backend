import mongoose, { Schema, model } from 'mongoose';

const ratingSchema = new Schema({
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, 
);

ratingSchema.index({ tenantId: 1, propertyId: 1 }, { unique: true });
const ratingModel = model('Rating', ratingSchema);
export default ratingModel;
