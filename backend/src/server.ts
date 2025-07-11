import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import cors from 'cors';
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors({
   origin: "https://sistema-docearia-81an.vercel.app"
}));
app.use(router);

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', `
  default-src 'self';
  script-src 'self';
  style-src 'self';
  img-src 'self' data:;
  connect-src 'self' https://sistema-docearia-sno1.vercel.app;
  font-src 'self';
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
`.replace(/\n/g, ''));
  next();
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno'
  });
});

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server online na porta ${port}`));
