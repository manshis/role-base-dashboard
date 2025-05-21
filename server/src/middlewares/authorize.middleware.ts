import { Request, Response, NextFunction } from "express";

const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.body?.role)) {
      res.status(403).json({ message: "Forbidden" });
    } else {
      next();
    }
  };
};

export default authorize;
