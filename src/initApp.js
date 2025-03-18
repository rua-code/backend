import connectDb from  "../DB/connection.js"

const initApp =()=>{
    connectDb();
}

export default initApp;