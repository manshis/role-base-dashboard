import { Request, Response, NextFunction } from "express";
const sensitiveFields = ["password"];

const maskingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;
  res.json = function (body: any) {
    console.log(body);
    maskSensitiveData(body);
    return originalJson.call(this, body);
  };
  next();
};

const maskSensitiveData = (item: any) => {
  if (typeof item === "object" && item !== null) {
    for (const key in item) {
      if (typeof item[key] === "string") {
        for (const field of sensitiveFields) {
          if (item[field]) {
            item[field] = "****";
          }
        }
      } else if (typeof item[key] === "object") {
        maskSensitiveData(item[key]);
      }
    }
  }
};

export default maskingMiddleware;
