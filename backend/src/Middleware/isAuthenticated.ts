import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IdSub {
  sub: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const auttoken = req.headers.authorization;

  if (!auttoken) {
    return res.status(401).end();
  }

  const [, token] = auttoken.split(' ');

  try {
    const { sub } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as IdSub;

    req.userId = sub;  
  

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
