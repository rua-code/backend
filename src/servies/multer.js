//تحديد نوع الفايل وتغيير اسم الفايل وقت التخزين ومكان التخزين
import multer from "multer"
 const fileUplode= (customValidition=[])=>{
    const storage = multer.diskStorage({ // cloudeniryبحدد وين بخزن 
        
        filename: function (req, file, cb) { //اسم الملف callback(cb)
          cb(null, file.originalname + '-' + Date.now()) // ال null if erorr 
        }
      })
      
      const fileFilter =(req,file,cb)=>{
        console.log('file',file.mimetype)
        if (customValidition.includes(file.mimetype)){
            cb(null,true)//خزنها 
        }else {
            cb("invalid format",false)
        }
      }
      const upload = multer({ storage: storage ,fileFilter})

      return upload

}
export default fileUplode


