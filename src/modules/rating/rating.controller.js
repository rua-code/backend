import ratingModel from "../../../DB/model/rating.model.js";
import propertyModel from "../../../DB/model/property.model.js";


export const addRating = async(req,res)=>{
    try{
        const tenantId=req.id;
        const { propertyId } = req.params;
        const { rating } = req.body; 
        //declration 
        //validation 
        if(!rating || rating<0 || rating >5 ){
            return res.status(400).json({message: " rating must be between 1 - 5"})
        }
        //testing
           const existingRating = await  ratingModel.findOne({propertyId,tenantId});// find by id i should put id but find one is searching by multibe counditions
           if (existingRating){
            return res.status(400).json({ message: "You have already rated this property" });
           }
           //now saving
           await ratingModel.create({tenantId,propertyId,rating})//نشئ تقييمًا جديدًا (rating) في قاعدة البيانات

              const property = await propertyModel.findById(propertyId);
                if (!property) {
                   return res.status(404).json({ message: "Property not found" });
                                  }
               if (!property.ratingCounts) property.ratingCounts = {};//
               property.ratingCounts[rating] = (property.ratingCounts[rating] || 0) + 1;
               property.totalRatings = (property.totalRatings || 0) + 1;
               property.sumRatings = (property.sumRatings || 0) + rating;
               property.averageRating = property.sumRatings / property.totalRatings;
                   
               await property.save();

               return res.status(201).json({ message: "Rating added successfully" });
           

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
      }
}