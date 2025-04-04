import userModel from "../../../DB/model/user.model.js";

export const getUser = async (req, res) => {
   try {
    const user= await userModel.find({});
    console.log(req.id);
   return res.json({message:"success",user});
   } catch (error) {
    return res.json ({message:`${error} erorr in function`})
   }
};

//فنكشن يعدل على المعلومات 

export const updateUser = async (req, res) => {
    const { userId } = req.params; 
    const { firstName, lastName, email ,role} = req.body; 

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });
    if(role) user.role=role;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
//role 
    await user.save();

    res.status(200).json({ message: "تم تحديث البيانات بنجاح", user });
};

