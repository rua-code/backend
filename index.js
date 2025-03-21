import express from "express"
import cors from "cors"
import authRouter from "./src/modules/auth/auth.router.js"
import userRouter from "./src/modules/user/user.router.js"
import connectDb from "./DB/connection.js"
import router from "./src/modules/auth/auth.router.js"
import { forgetPassword } from "./src/modules/auth/controller/auth.controller.js"
const app = express()
connectDb();
 app.use(cors())
 app.use(express.json())
 app.use('/api/v1/auth/',authRouter)
  app.use('/api/v1/user',userRouter)
app.get('*', (req, res)=> { 
  res.json({massage:'erorr page not find'})
})


app.listen(3000,(req,res)=>{ 
    console.log('the server running succsefully')
}) 