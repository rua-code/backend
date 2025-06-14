// import {userModel} from "../../../../DB/model/user.model.js";
import { nanoid, customAlphabet } from 'nanoid'
import userModel from "../../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../../servies/sendEmail.js";
import MailMessage from "nodemailer/lib/mailer/mail-message.js";
import { assign } from "nodemailer/lib/shared/index.js";
export const SignUp = async (req, res) => {
  try {
  
    const { email, password, firstName, lastName, confirmPassword, idNo, birthDate } = req.body; 
  
    // نتاكد اذا مسجل بنفس الايميل مسبقا
    // بنبحث في db عن ايميل نفس الايميل الي بعتته الفرونت
    const user = await userModel.findOne({email:email});
    
    if(user){
      return res.json({message:"الايميل مسجل مسبقا",success:false})
    }

   
    if(password != confirmPassword){
      return res.json({message:"الباسورد غلط",success:false})
    }

    // تشفير الباسورد
    const hashpassword = bcrypt.hashSync(password, 8);
  
    //نضيف ع db
    const newUser=await userModel.create({
      email,
      firstName,
      lastName,
      idNo,
      birthDate,
      password:hashpassword
    })
  
    /// token تشفير لمعلومات اليوزر 
     const token = jwt.sign({email,firstName,lastName},"rent")
     console.log(token);
     
     const message= `
    <p> you have signed up</p>
    <a href="http://localhost:3000/api/v1/auth/confirmEmail/${token}"> confirm your email</a>

     `
    // sendEmail
    await sendEmail(email,"rent",message)
     

    res.json({ message: "success"})
    console.log("signed up",token);
  } catch (error) {
    res.json({ message: `error catch ${error}` })
  }
}

     export const confirmEmail= async(req,res)=>{
      const {token}=req.params;
      const decoded =jwt.verify(token,"rent");
      const user = await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true});
      if(!user){
        return res.json({message:'not find user'})
      }
         return res.status(200).json({message:"success",user});
     }


     export const login = async (req,res) =>{
      const{email,password}=req.body;
      const user = await userModel.findOne({email});
      if(user.confirmEmail==false){
        return res.json({message:"please confirm your email"})
      }
      if(!user){
        return res.status(404).json({message:"user not Found"});
      }
        const match = bcrypt.compareSync(password,user.password);
        if(!match){
          return res.status(404).json({message:"invalid password"});
        }
        const token = await jwt.sign({id:user._id,email,firstName:user.firstName,lastName:user.lastName,role:user.role},"rent")
        return res.status(200).json({message:"success",token});
     }


     export const forgetPassword =  async(req,res) =>{
      const {email}=req.body;
      const code  = customAlphabet('1234567890abcdef', 5)();
      const user= await userModel.findOneAndUpdate({email},{sendcode:code});
      if(!user){
        return res.json({message:"email not found"})
      }
      
      const  html=`<h2>code is ${code} </h2>`;
      await sendEmail(email,"rent",html);
      return res.status(200).json({message:"success"});
     }

     export const resetPassword = async(req,res)=>{
       const {code,email,password}=req.body;
       const user = await userModel.findOne({email});
       if(!user){
                return res.status(404).json({message:"user not Found"});
 
       }
       if (user.sendcode != code){
        return res.status(404).json({message:"not valid code"});
       }
       const hashpassword= await bcrypt.hash(password,8);
       user.password=hashpassword;
       user.sendcode=null;
       user.save();
       return res.status(200).json({message:"success"});

     }
export const checkCode=async(req,res)=>{

  const {code,email}=req.body;
   const user = await userModel.findOne({email});
       if(!user){
                return res.status(404).json({message:"user not Found"});//تعبر عن حالة النتيجة
 
       }
   if (user.sendcode != code){
        return res.status(404).json({message:"not valid code"});

       }
       return res.status(200).json({message:"success"});

};

export const newPassword = async(req,res)=>{
  const {password,newPassword,confirmPassword}=req.body;
  const userId = req.id;
  const user = await userModel.findById(userId);
  if(!user){
    return res.status(400).json({message:"user not Found"});
  }
  
  const match = bcrypt.compareSync(password,user.password);
  if(!match){
    return res.status(400).json({message:"invalid password"});
  }

  if(newPassword != confirmPassword){
    return res.status(400).json({message:"password not match"});
  }

  const hashpassword= await bcrypt.hash(newPassword,8);
  user.password=hashpassword;
  await user.save();
  return res.status(200).json({message:"success"});


}