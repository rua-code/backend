import jwt from 'jsonwebtoken';
import userModel from '../../DB/model/user.model.js';

export const auth = (accessRoles= [])=> { 
    return async(req,res,next)=>{
        const {token}= req.headers 
        if(!token){
            return res.status(403).json({message:"access denied "});
        }
         const decoded= jwt.verify(token,"rent")//rent is the secret key 
         console.log(decoded);
         const user=await userModel.findOne({email:decoded.email});
         if(!decoded){
            return res.status(403).json({message:"auth not found"}) 
        }
        if(!accessRoles.includes(user.role)){
            return res.status(403).json({message:"access denied"})

        }
        req.id=decoded.id;
        next();
    }
}