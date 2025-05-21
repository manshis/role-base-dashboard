import express, { Request, Response } from "express";
import IUser from "../models/user";
import bcrypt from "bcryptjs";
import { collections } from "../services/database.service";
import { generateToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as IUser;
    if (!newUser) {
      res.status(400).send("Request body is missing.");
    }
    if (collections.users) {
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      const result = await collections.users.insertOne(newUser);

      result
        ? res.status(201).send({ result })
        : res.status(500).send("Failed to create a new user.");
    } else {
      res.status(500).send("User collection is not initialized.");
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await collections.users?.findOne<IUser>({
      username,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      // generate token here
      const token = generateToken(user);
      res.status(200).json({ token });
    } else {
      res.status(401).send("Invalid email or password.");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};
