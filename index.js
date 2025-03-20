import express from "express"
import cors from "cors"
import authRouter from "./src/modules/auth/auth.router.js"
import connectDb from "./DB/connection.js"
const app = express()
connectDb();
 app.use(cors())
 app.use(express.json())
 app.use('/api/v1/auth/',authRouter)
   
app.get('*', (req, res)=> { 
  res.json({massage:'erorr'})
})

app.listen(3000,(req,res)=>{ 
    console.log('the server running succsefully')
}) 