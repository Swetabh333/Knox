import mongoose,{Schema,Document} from "mongoose";

//This interface is used to define how we'll store the data in our mongodb database.
interface coin extends Document{
    coinId:"bitcoin" | "ethereum" | "matic-netwok";
    price:number;
    marketCap:number;
    change24h:number;
    timestamp:Date;
}
//This is the schema that will be followed for every coin.
const coinSchema = new Schema<coin>({
    coinId:{
        type:String,
        required:true,
        enum:["bitcoin","ethereum","matic-netwoek"]
    },
    price:{
        type:Number,
        required:true,
    },
    marketCap:{
        type:Number,
        required:true,
    },
    change24h:{
        type:Number,
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});

export default mongoose.model<coin>("Crypto",coinSchema);