"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//creating a router for handling different api endpoints.
const router = express_1.default.Router();
const isValidCoin = (coin) => {
    return ['bitcoin', 'matic-network', 'ethereum'].includes(coin);
};
exports.default = router;
