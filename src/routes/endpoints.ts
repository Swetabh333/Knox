import express,{ Router,Request,Response } from "express";
import Crypto from "../schema/coinSchema"


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
          res.status(404).json({ error: 'Data not found' });
          return;
        }
    
        res.json({
          price: latestData.price,
          marketCap: latestData.marketCap,
          "24hChange": latestData.change24h
        });
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
});

router.get("/deviation",(req:Request,res:Response)=>{
                                                                                                                                                                                                                                                      
})

export default router;