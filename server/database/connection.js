const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'config.env'});
const connectdb=async()=>{
    try{
     const con= await mongoose.connect(process.env.mongo_uri,{
         useNewUrlParser:true,
         useUnifiedTopology:true,
         useFindAndModify:false,
         useCreateIndex:true
     });
     console.log(`Mongo db connected `);
    }catch(err){
       console.log(err);
    }
}


module.exports=connectdb