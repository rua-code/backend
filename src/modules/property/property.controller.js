import propertyModel from "../../../DB/model/property.model.js" 

export const addproprety= async (req,res)=>{
const fileimage=req.files 
//req from
try{
 const{location,ownerId,image,price,address,propertyType,area,numberRoom}=req.body;
 if (typeof location !== "string") {
    return res.status(400).json({ message: "type of location not valid" });
}
// if(ownerId !== ownerId.propretymodel){
//     return res.json({ message: "owner id not valid" });
// }
if (typeof price !== "Number") {
    return res.status(400).json({ message: "price must be a number" });
}
if (typeof numberRoom !== "Number") {
    return res.status(400).json({ message: "Number of rooms must be a number" });

}
// if(image !==Array.isArray(images)){
//     return res.json({ message: "add images" });

// }
if (!Array.isArray(image)) { 
    return res.status(400).json({ message: "Images must be an array" });
}
if (typeof address !== "string") {
    return res.status(400).json({ message: "addres must be a string" });}

if (typeof propertyType !== "string") {
    return res.status(400).json({ message: "Property type must be a string" });// بالفرونت رح تكون drop down list
}

if (typeof area !== "Number") {
    return res.status(400).json({ message: "Area must be a number" });
}
const newProperty = new PropertyModel({
    location,
    ownerId,
    image,
    price,
    address,
    propertyType,
    area,
    numberRoom,
});

await newProperty.save();

 return res.json({message:"property added",fileimage});}
 catch (error) {
    return res.status(500).json({ message: `Server error: ${error.message}` });
}
}

export const updateProperty = async (req,res)=>{
  const {propertyId}  =req.body //مش حكينا انو by defualt بكون في اي دي كيف اجيبه 
  
  if (!propertyId) {
    return res.status(400).json({ message: "Property ID is required" });
  }
  const property = await PropertyModel.findById(propertyId);
  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }
  const { name, price, location } = req.body;
    if (name) property.name = name;
    if (price) property.price = price;
    if (location) property.location = location;
    
    // await newProperty.save();
}

export const deleteProperty=async (req,res) =>{
    const {propertyId}=req.body;
    if(!propertyId){
        res.status(400).json({message:"No id"})  
      }
      const deletedProperty = await propertyModel.findByIdAndDelete(propertyId);
      if (!deletedProperty) {
        return res.status(404).json({ message: "Property not found" });
      }
 

}


//// crud  ==> create ,read ,update , delete 
//add+update 
