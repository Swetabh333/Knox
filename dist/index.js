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
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = __importDefault(require("./database/mongodb"));
const dotenv_1 = __importDefault(require("dotenv"));
const fetchdata_1 = __importDefault(require("./job/fetchdata"));
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
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json()); //to be able to read json requets.
app.options("*", (0, cors_1.default)(corsOptions)); // This one is for preflightrequest
app.get("/ping", (req, res) => {
    res.send("pong");
});
//creating a top level async function to make sure we are connected to database before starting background worker.
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Function call to connect to database.
        yield (0, mongodb_1.default)();
        //starts the background worker
        (0, fetchdata_1.default)();
        //Server starts listening for requests at port 3000.
        app.listen(port, () => {
            console.log(`Connected successfully to port ${port}`);
        });
    }
    catch (err) {
        console.error("Failed to start the server:", err);
        process.exit(1);
    }
});
//Starts our main program.
startServer();
