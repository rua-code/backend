import userModel from "../../../DB/model/user.model.js";

export const getUser = async (req, res) => {
   try {
    const user= await userModel.find({});
   return res.json({message:"success",user});
   } catch (error) {
    return res.json ({message:`${error} erorr in function`})
   }
};

//فنكشن يعدل على المعلومات 

