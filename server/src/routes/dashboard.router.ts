import express, { Request, Response } from "express";
import { getAdminData, getUserData } from "../controllers/dashboard.controller";
import authenticate from "../middlewares/authenticate.middleware";
import authorize from "../middlewares/authorize.middleware";

const dashboardRouter = express.Router();

dashboardRouter.get("/admin", authenticate, authorize(["admin"]), getAdminData);
dashboardRouter.get(
  "/user",
  authenticate,
  authorize(["user", "admin"]),
  getUserData
);

export default dashboardRouter;
