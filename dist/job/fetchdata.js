"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const node_cron_1 = __importDefault(require("node-cron"));
const coinSchema_1 = __importDefault(require("../schema/coinSchema"));
;
//Background Job that will fetch data for our given 3 currencies - BTC,ETH and MATIC
const fetchCoinData = () => __awaiter(void 0, void 0, void 0, function* () {
    const coins = ["bitcoin", "ethereum", "matic-network"];
    const apiURL = "https://api.coingecko.com/api/v3/simple/price";
    //for of loop to get data for each of the 3 currencies
    for (const coin of coins) {
        try {
            const response = yield axios_1.default.get(apiURL, {
                params: {
                    ids: coin,
                    vs_currencies: "usd",
                    include_market_cap: true,
                    include_24hr_change: true
                }
            });
            const data = response.data[coin];
            yield coinSchema_1.default.create({
                coinId: coin,
                price: data.usd,
                marketCap: data.usd_market_cap,
                change24h: data.usd_24h_change,
            });
        }
        catch (err) {
            //If error is of type Error we output it's message otherwise convert the error to string and then output it
            console.log(`Error while fetching data for ${coin} : ${err instanceof Error ? err.message : String(err)}`);
        }
    }
});
//This function calls the background worker immediately once and then schedules it to run every 2 hours.
const startCronJob = () => {
    fetchCoinData(); // runs the function immediately once
    console.log("cron job started");
    node_cron_1.default.schedule("0 */2 * * *", fetchCoinData); //schedules it to run every 2 hours.
};
exports.default = startCronJob;
