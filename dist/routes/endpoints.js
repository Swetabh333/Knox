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
const express_1 = __importDefault(require("express"));
const coinSchema_1 = __importDefault(require("../schema/coinSchema"));
//creating a router for handling different api endpoints.
const router = express_1.default.Router();
//This function narrows down whether coin is of valid i.e. one of btc,eth or matic
const isValidCoin = (coin) => {
    return ['bitcoin', 'matic-network', 'ethereum'].includes(coin);
};
//This route is used to get the stats for a particula coin
router.get("/stats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coin } = req.query;
    if (typeof coin !== 'string' || !isValidCoin(coin)) {
        res.status(400).json({ error: 'Invalid coin' });
        return;
    }
    try {
        const latestData = yield coinSchema_1.default.findOne({ coinId: coin }).sort({ timestamp: -1 });
        if (!latestData) {
            res.status(404).json({ error: 'Requested data not found' });
            return;
        }
        res.status(200).json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
//This endpoint is for getting the deviation for last 100 enteries of a coin
router.get("/deviation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coin } = req.query;
    if (typeof coin !== 'string' || !isValidCoin(coin)) {
        res.status(400).json({ error: 'Invalid coin' });
        return;
    }
    try {
        const data = yield coinSchema_1.default.find({ coinId: coin })
            .sort({ timeStamp: -1 })
            .limit(100)
            .select('price');
        if (data.length === 0) {
            res.status(404).json({ error: "Requested data not found" });
            return;
        }
        //Calculating standard deviation S.D. = sqrt(sum((value-mean)^2)/total no. of values)
        const prices = data.map(item => item.price);
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const squaredDifferences = prices.map(price => Math.pow(price - mean, 2));
        const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / prices.length;
        const standardDeviation = Math.sqrt(variance);
        res.status(200).json({ deviation: standardDeviation });
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = router;
