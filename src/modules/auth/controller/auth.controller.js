// import {userModel} from "../../../../DB/model/user.model.js";
import { nanoid, customAlphabet } from 'nanoid'
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
    res.json({ message: "success"})
    console.log("signed up",token);
  } catch (error) {
    res.json({ message: `error catch ${error}` })
  }
}

     export const confirmEmail= async(req,res)=>{
      const {token}=req.params;
      console.log(token);
      const decoded =jwt.verify(token,"rent");
      console.log(decoded);
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
        return res.json({message:"confirm your email"})
      }
      if(!user){
        return res.status(404).json({message:"user not Found"});//تعبر عن حالة النتيجة

      }
        const match = bcrypt.compareSync(password,user.password);

        if(!match){
          return res.status(404).json({message:"user not Found"});
        }
        const token = await jwt.sign({id:user._id,email,firstName:user.firstName,lastName:user.lastName,role:user.role},"rent")
        return res.status(200).json({message:"succses",token});
     }


     export const forgetPassword =  async(req,res) =>{
      const {email}=req.body;
      const code  = customAlphabet('1234567890abcdef', 5)();
      console.log("code",code);
      const user= await userModel.findOneAndUpdate({email},{sendcode:code});
      if(!user){
        return res.json({message:"email not found"})
      }
      
      const  html=`<h2>code is ${code} </h2>`;
      await sendEmail(email,"rent",html);

      return res.status(200).json({message:"succses"});
     }

     export const resetPassword = async(req,res)=>{
       const {code,email,password}=req.body;
       const user = await userModel.findOne({email});
       if(!user){
                return res.status(404).json({message:"user not Found"});//تعبر عن حالة النتيجة
 
       }
       if (user.sendcode != code){
        return res.status(404).json({message:"not valid code"});//تعبر عن حالة النتيجة

       }
       const hashpassword= await bcrypt.hash(password,8);
       user.password=hashpassword;// why not findone and update.
       user.sendcode=null;
       user.save();
       return res.status(200).json({message:"succses"});
// ليش بكل فنكشن برجعها
     }