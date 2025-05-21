import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const jwtSecret = process.env.JWT_SECRET || "";
      const decoded = jwt.verify(token, jwtSecret);
      req.body = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
};

export default authenticate;
