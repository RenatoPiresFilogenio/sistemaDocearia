import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';
import { router } from "./routes";
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(router);


app.get('/', (req, res) => {
  throw new Error('BROKEN') 
})



app.listen(3333, () => console.log("Server online"));