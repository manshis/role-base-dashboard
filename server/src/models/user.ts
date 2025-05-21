import { ObjectId } from "mongodb";

export default interface IUser {
  _id?: ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  email: number;
  password: string;
  dob: string;
  role: "admin" | "user";
}
