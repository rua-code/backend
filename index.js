import express from "express"
import initApp from "./src/initApp.js"
const app = express()
   initApp();
app.get('/user', (req, res)=> {
  res.json({massage:'Hello World'})
})

app.listen(3000,(req,res)=>{ 
    console.log('the server running suss')
}) 