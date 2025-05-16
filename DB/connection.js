import  mongoose from 'mongoose';
 const connectDb=async ()=> {
 return await mongoose.connect('mongodb://127.0.0.1:27017/rent').then(result=>{
    console.log('db connection established');
 }).catch(err=>{
    console.log(`connecting fail ${err}`);
 });
  

  }

  export default connectDb
  //mongodb://127.0.0.1:27017/rent'
  //mongodb+srv://rua:rent@cluster0.xwiyw.mongodb.net/rent
  