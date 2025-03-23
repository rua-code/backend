import jwt, { decode, verify } from 'jsonwebtoken';
import userModel from '../../DB/model/user.model';

export const auth = (accessRoles= [])=> { //ما فهمت الاكسس رولز 
    return (req,res,next)=>{
        const {token}= req.headers

        if(!token){
            return res.status(403).json({message:"access denied "});//why not res.json
        }
         const decoded= verify(token,"rent")

         const user=userModel.findById(decoded.id)
         console.log(decoded);
         if(!decoded){
            return res.status(403).json({message:"access denied "})
        }
        // if(decoded.role=='tenant'){
        //     return res.status(401).json({message:"access denied "}) 
        // }
        
        if(!accessRoles.includes(user.role)){
            return res.status(403).json({message:"access denied "})

        }

        req.id=decoded.id;//وين رح استعمل ال id وشو هو ال decoded id
        next();
    }
}