import express, { Request, Response } from "express";
import { register } from "../controllers/user.controller";
import { login } from "../controllers/user.controller";
import {
  registerValidation,
  loginValidation,
} from "../validators/user.validator";
import validate from "../middlewares/validator.middleware";

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  res.status(200).json({ message: "User route is working!" });
});

usersRouter.post("/register", registerValidation, validate, register);
usersRouter.post("/login", loginValidation, validate, login);

export default usersRouter;
