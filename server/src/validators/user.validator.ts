import { collections } from "../services/database.service";
const { body } = require("express-validator");

export const registerValidation = [
  body("username").custom(async (value: string) => {
    if (!value) {
      throw new Error("Username is required");
    } else {
      const user = await collections.users?.findOne({
        username: value,
      });
      if (user) {
        throw new Error("Username already in use");
      }
    }
  }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("firstName").notEmpty().withMessage("FirstName is required"),
  body("lastName").optional(),
  body("email").isEmail().withMessage("Email is required"),
  body("dob").notEmpty().withMessage("Date of Birth is required"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "user"])
    .withMessage("Role must be either 'admin' or 'user'"),
];

export const loginValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
