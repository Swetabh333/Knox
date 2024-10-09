import express, { Application, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import connectToDatabase from "./database/mongodb";
import dotenv from "dotenv"


//To be able to load files from environment
dotenv.config();

//Starting an  express application server.
const app: Application = express();

//Default port 3000 if not specified in environment.
const port = process.env.PORT || 3000;

//Configuring cors to only be able to use post method to retreive data from the server ensuring better security.
const corsOptions: CorsOptions = {
  origin:"*",
  methods:"POST",
  allowedHeaders:"Origin, X-Requested-With, Content-Type, Accept",
}

//Function call to connect to database.
connectToDatabase();

app.use(cors(corsOptions));
app.use(express.json()) //to be able to read json requets.
app.options("*",cors(corsOptions)); // This one is for preflightrequest
app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

//Server starts listening for requests at port 3000.
app.listen(port, () => {
  console.log(`Connected successfully to port ${port}`);
});
