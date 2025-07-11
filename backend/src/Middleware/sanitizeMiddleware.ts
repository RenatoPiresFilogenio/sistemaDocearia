import xss from "xss";
import { Request, Response, NextFunction } from "express";

function sanitize(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;

  for (let key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = xss(obj[key]);
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      sanitize(obj[key]); // Recursivo
    }
  }

  return obj;
}

export function sanitizeMiddleware(req: Request, res: Response, next: NextFunction) {
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  next();
}
