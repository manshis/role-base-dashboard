import { Request, Response, NextFunction } from "express";
const { validationResult } = require("express-validator");

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json({ errors: errors });
  }
};

export default validate;
