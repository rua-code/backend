// import {userModel} from "../../../../DB/model/user.model.js";

import userModel from "../../../../DB/model/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const SignUp = async (req, res) => {
  try {
    console.log('hii')
    //نستقبل الداتا الي جاي من افرونت 
    const { email, password, firstName, lastName, confirmpassword } = req.body; // بعرف لازم ناخدها من البودي بس ليه حيطنا شو ياخد
    console.log(email)

    // نتاكد اذا مسجل بنفس الايميل مسبقا
    // بنبحث في db عن ايميل نفس الايميل الي بعتته الفرونت
    const user = await userModel.findOne({email:email});
    /// const user =await userModel.findById()
    if(user){
      return res.json({message:"الايميل مسجل مسبقا",success:false})
    }

    // نفحص اذا الباسورد بساوي الكونفيرم
    if(password != confirmpassword){
      return res.json({message:"الباسورد غلط",success:false})
    }

    // تشفير الباسورد
    const hashpassword = bcrypt.hashSync(password, 8);
    console.log(hashpassword)
    //نضيف ع db
    const newUser=await userModel.create({//مش فاهمتها
      email,
      password,
      firstName,
      lastName,
      password:hashpassword
    })

    /// token تشفير لمعلومات اليوزر 
     const token =await jwt.sign({id: userid})// معرفتش اكمل

    // sendEmail

    /// بنرجع للفرونت اند res.json()
    res.json({ message: "success",newUser })
    console.log("signed up");
  } catch (error) {
    res.json({ message: `error catch ${error}` })
  }
}
export const login = async (req, res) => {
  try {

    res.json({ message: "success" })
    console.log("signed up");
  } catch (error) {
    res.json(error)
  }
}