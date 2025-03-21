// import {userModel} from "../../../../DB/model/user.model.js";

import userModel from "../../../../DB/model/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../../servies/sendEmail.js";
import MailMessage from "nodemailer/lib/mailer/mail-message.js";
import { assign } from "nodemailer/lib/shared/index.js";
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
      return res.json({message:"الايميل مسجل مسبقا",success:false})// ال success whyy
    }

    // نفحص اذا الباسورد بساوي الكونفيرم
    if(password != confirmpassword){
      return res.json({message:"الباسورد غلط",success:false})
    }

    // تشفير الباسورد
    const hashpassword = bcrypt.hashSync(password, 8);
    console.log(hashpassword)
    //نضيف ع db
    const newUser=await userModel.create({
      email,
      password,
      firstName,
      lastName,
      password:hashpassword
    })
  
    /// token تشفير لمعلومات اليوزر 
     const token = jwt.sign({email,firstName,lastName},"rent")//inspect 
     console.log(token);
     
     const message= `
    <p> you have signed up</p>
    <a href="http://localhost:3000/api/v1/auth/confirmEmail/${token}"> confirm your email</a>

     `
    // sendEmail
    await sendEmail(email,"rent",message)
     
    /// بنرجع للفرونت اند res.json()
    res.json({ message: "success",token})
    console.log("signed up",token);
  } catch (error) {
    res.json({ message: `error catch ${error}` })
  }
}
export const signup = async (req, res) => {
  try {

    res.json({ message: "success" })
    console.log("signed up");
  } catch (error) {
    res.json(error)
  }
  
}

     export const confirmEmail=(req,res)=>{
      const {token}=req.params;
      console.log(token);
      const decoded =jwt.verify(token,"rent");
      console.log(decoded);
      const user =  userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true});
         return res.status(200).json({message:"success"});
         
     }


     export const login = async (req,res) =>{
      return res.json("login");

      const{email,password}=req.body;
      const user = await userModel.findOne({email});
      if(user==null){
        return res.status(404).json({message:"user not Found"});

      }
const match = bcrypt.compareSync(password,user.password);

        if(!match){
          return res.status(404).json({message:"user not Found"});
        }
        const token = await jwt.sign({email,password},"rent")
        return res.status(200).json({message:"succses",token});
     }