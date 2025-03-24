import jwt from 'jsonwebtoken';
import userModel from '../../DB/model/user.model.js';

export const auth = (accessRoles= [])=> { //ما فهمت الاكسس رولز 
    return async(req,res,next)=>{
        const {token}= req.headers

        if(!token){
            return res.status(403).json({message:"access denied "});//why not res.json
        }
         const decoded= jwt.verify(token,"rent")
         console.log(decoded);
         const user=await userModel.findOne({email:decoded.email});
         if(!decoded){
            return res.status(403).json({message:"access denied "})
        }
        // if(decoded.role=='tenant'){
        //     return res.status(401).sjson({message:"access denied "}) 
        // }
        if(!accessRoles.includes(user.role)){
            return res.status(403).json({message:"auth not found"})

        }
        // endpoint ??
        // req method ==> get , post , patch,delete
        // req url 
        // admin , renter 
        req.id=decoded.id;//وين رح استعمل ال id وشو هو ال decoded id
        next();
    }
}