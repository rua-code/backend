import propertyModel from "../../../DB/model/property.model.js"
import cloudinary from "../../servies/cloudinary.js"


export const addproprety = async (req, res) => {
    const fileimage = req.files
    //req from
    try {
        const { lng, lat, price, address, propertyType, area, numberRoom ,title} = req.body;
        if (!fileimage) {
            return res.status(400).json({ message: "image is reqeird" });
        }

        const images = []
        const publicId = []
        for (const file of req.files) {
            const { public_id, secure_url } = await cloudinary.uploader.upload(file.path, { folder: `Rent/property/${req.id}` })
            images.push(secure_url)
            publicId.push(public_id);
        }

        const property = await propertyModel.create({
            price,
            numberRoom,
            area,
            propertyType,
            address,
            location: {
                type: 'Point'
                ,
                coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            image:images,
            publicId:publicId,
            ownerId:req.id,
            title
        })

        return res.json({ message: "property added", property });
    }
    catch (error) {
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
}

export const updateProperty = async (req, res) => {
    const { propertyId } = req.params
    const property = await propertyModel.findById(propertyId);
    if(property.ownerId!=req.id){
        return res.status(400).json({message:"not allowed"})
    }
    if (!property) {
        return res.status(404).json({ message: "Property not found" });
    }
    const { title, price} = req.body;
    if (title) property.title = title;
    if (price) property.price = price;
    if (req.files){
        const images = []
        const publicId = []
        for (const file of req.files) {
            const { public_id, secure_url } = await cloudinary.uploader.upload(file.path, { folder: `Rent/property/${req.id}` })
            images.push(secure_url)
            publicId.push(public_id);
        }
        property.image=images;
        property.publicId=publicId
    }
            
     await  property.save();
     return res.status(200).json ({message:"property updeated"});
}

export const deleteProperty = async (req, res) => {
    const { propertyId } = req.params;
    const property = await propertyModel.findById(propertyId);
   if(property.ownerId!=req.id){
        return res.status(400).json({message:"not allowed"})
    }  
    const deletedProperty = await propertyModel.findByIdAndDelete(propertyId);
    if (!deletedProperty) {
        return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({ message: "Property deleted" });
}


//// crud  ==> create ,read ,update , delete
//add+update 
