"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = __importDefault(require("./database/mongodb"));
const dotenv_1 = __importDefault(require("dotenv"));
//To be able to load files from environment
dotenv_1.default.config();
//Starting an  express application server.
const app = (0, express_1.default)();
//Default port 3000 if not specified in environment.
const port = process.env.PORT || 3000;
//Configuring cors to only be able to use post method to retreive data from the server ensuring better security.
const corsOptions = {
    origin: "*",
    methods: "POST",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
};
//Function call to connect to database.
(0, mongodb_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json()); //to be able to read json requets.
app.options("*", (0, cors_1.default)(corsOptions)); // This one is for preflightrequest
app.get("/ping", (req, res) => {
    res.send("pong");
});
//Server starts listening for requests at port 3000.
app.listen(port, () => {
    console.log(`Connected successfully to port ${port}`);
});
