import jwt from "jsonwebtoken";
import IUser from "../models/user";
export const generateToken = (user: IUser) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET || "",
    { expiresIn: "1h" }
  );
  return token;
};
