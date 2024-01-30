import mongoose from "mongoose";

export function connect(){
    mongoose.connect(process.env.MONGO_URI as string,{
        tls: true,
    })
    .then(()=> console.log('connected succeesfully') )
    .catch((error)=> console.log(error) )
}