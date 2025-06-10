import ratingModel from "../../../DB/model/rating.model.js";
import propertyModel from "../../../DB/model/property.model.js";
import bookingModel from "../../../DB/model/booking.model.js";

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
        const booking = await bookingModel.findOne({
            tenantId,
            propertyId,
            status: { $in: ["approved", "completed"] }
          });
          if (!booking) {
            return res.status(400).json({
              message: "You can only rate properties you've booked and had approved/completed"
            });
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
       
                   
               await property.save();

               return res.status(201).json({ message: "Rating added successfully" });
           

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
      }
}


export const updateRating = async (req, res) => {
  try {
    const tenantId = req.id; // From token
    const { propertyId } = req.params;
    var  { rating } = req.body;
    // Check if rating is valid
    rating = parseInt(rating);
        console.log(rating);

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 - 5" });
    }

    // Check if the tenant has an approved or completed booking for this property
    const validBooking = await bookingModel.findOne({
      propertyId,
      tenantId,
      status: { $in: ["approved", "complete"] }
    });

    if (!validBooking) {
      return res.status(403).json({ message: "You can only rate properties you have booked and completed/approved" });
    }

    const property = await propertyModel.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (!property.ratingCounts) property.ratingCounts = {};

    // Check if a rating already exists for this tenant and property
    let existingRating = await ratingModel.findOne({ propertyId, tenantId });

    if (!existingRating) {
      // Create new rating
      await ratingModel.create({ propertyId, tenantId, rating });

      // Increase count for new rating
      property.ratingCounts[rating] = (property.ratingCounts[rating] || 0) + 1;
    } else {
      // Update existing rating
      const oldRating = existingRating.rating;
      existingRating.rating = rating;
      await existingRating.save();

      // Adjust old and new rating counts
      if (property.ratingCounts[oldRating]) {
        property.ratingCounts[oldRating] -= 1;
        if (property.ratingCounts[oldRating] < 0) {
          property.ratingCounts[oldRating] = 0;
        }
      }

      property.ratingCounts[rating] = (property.ratingCounts[rating] || 0) + 1;
    }

    await property.save();

    return res.status(200).json({ message: "Rating processed successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getTenantRatings = async (req, res) => {
    try {
      const tenantId = req.id; // من التوكن
  
      const ratings = await ratingModel.find({ tenantId }).populate("propertyId");
  
      return res.status(200).json({ ratings });
  
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };