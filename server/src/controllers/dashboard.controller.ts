import { Request, Response } from "express";
import IUser from "../models/user";
import { collections } from "../services/database.service";

export const getAdminData = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const users = await collections.users?.find<IUser[]>({}).toArray();
    res.status(200).json({ users });
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

export const getUserData = async (req: Request, res: Response) => {
  const { id, username } = req.body;
  try {
    const user = await collections.users?.findOne<IUser>({
      username,
    });
    if (!user) {
      res.status(404).send("User not found.");
    } else {
      res.status(200).json({ user });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};
