import mongoose from "mongoose";

//Function to get the mongoDB URI string from environment and then use it to connect to your mongodb instance.
const connectToDatabase = async () =>{
    try{

        const URI = process.env.MONGODB_URI;
        if(URI){
            await mongoose.connect(URI);
            console.log("Connected to database")
        }else{
            throw new Error("Database connection string not found")
        }
    }catch(err){
        console.log(err);
    }
}

export default connectToDatabase;