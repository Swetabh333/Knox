import express,{ Router,Request,Response } from "express";
import Crypto from "../schema/coinSchema"
import { timeStamp } from "console";


//creating a router for handling different api endpoints.
const router = express.Router();

type validCoin = "bitcoin" | "ethereum" | "matic-network";

//This function narrows down whether coin is of valid i.e. one of btc,eth or matic
const isValidCoin = (coin:string) : boolean => {
    return ['bitcoin', 'matic-network', 'ethereum'].includes(coin);
}

//This route is used to get the stats for a particula coin
router.get("/stats",async (req:Request,res:Response)=>{
    const { coin } = req.query;
    if (typeof coin !== 'string' || !isValidCoin(coin)) {
        res.status(400).json({ error: 'Invalid coin' });
        return;
      }
    
      try {
        const latestData = await Crypto.findOne({ coinId: coin }).sort({ timestamp: -1 });
    
        if (!latestData) {
          res.status(404).json({error:'Requested data not found'});
          return;
        }
    
        res.status(200).json({
          price: latestData.price,
          marketCap: latestData.marketCap,
          "24hChange": latestData.change24h
        });
      } catch (error) {
        res.status(500).json({error:'Internal server error'});
      }
});

//This endpoint is for getting the deviation for last 100 enteries of a coin
router.get("/deviation",async (req:Request,res:Response)=>{
    const {coin} = req.query;

    if(typeof coin !== 'string' || !isValidCoin(coin)) {
        res.status(400).json({ error: 'Invalid coin' });
        return;
    }

    try{
        const data = await Crypto.find({coinId: coin})
        .sort({timeStamp:-1})
        .limit(100)
        .select('price');

        if(data.length === 0){
            res.status(404).json({error:"Requested data not found"});
            return;
        }
        //Calculating standard deviation S.D. = sqrt(sum((value-mean)^2)/total no. of values)
        const prices = data.map(item => item.price);
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const squaredDifferences = prices.map(price => Math.pow(price - mean, 2));
        const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / prices.length;
        const standardDeviation = Math.sqrt(variance);

        res.status(200).json({deviation:standardDeviation});
    }catch(err){
        res.status(500).json({error:"Internal server error"})
    }

    

})

export default router;