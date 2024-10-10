import axios from "axios";
import nc from "node-cron";
import Crypto from "../schema/coinSchema"

//interface for the api response for type safety

interface apiResponse {
    [key:string]:{
        usd:number;
        usd_market_cap:number;
        usd_24_change:number;
    };
};


//Background Job that will fetch data for our given 3 currencies - BTC,ETH and MATIC
const fetchCoinData = async () =>{
    const coins = ["bitcoin","ethereum","matic-network"];
    const apiURL = "https://api.coingecko.com/api/v3/simple/price";

    //for of loop to get data for each of the 3 currencies
    for(const coin of coins){
        try{
            const response = await axios.get<apiResponse>(apiURL,{
                params:{
                    ids:coin,
                    vs_currencies:"usd",
                    include_market_cap:true,
                    include_24hr_change:true
                }
            });

            const data = response.data[coin];
            await Crypto.create({
                coinId:coin,
                price:data.usd,
                marketCap:data.usd_market_cap,
                change24h:data.usd_24_change
            });

        }catch(err){
            //If error is of type Error we output it's message otherwise convert the error to string and then output it
            console.log(`Error while fetching data for ${coin} : ${err instanceof Error ? err.message : String(err)}`);
        }
    }

}

//This function calls the background worker immediately once and then schedules it to run every 2 hours.
const startCronJob = ()=>{
    fetchCoinData(); // runs the function immediately once
    nc.schedule("0 */2 * * *",fetchCoinData); //schedules it to run every 2 hours.
}

export default startCronJob;