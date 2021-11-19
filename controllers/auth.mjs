import { body } from "express-validator";
import users from "../models/user.mjs";
import bcrypt from "bcrypt";

export const verifyUser = [
  body(
    "email",
    "The email should be in following format (mailbox @ domainname)"
  )
    .isEmail()
    .custom(async (email) => {
      const user = await users.findOne({ email });
      if (!user) {
        throw new Error("Email is not found");
      }
      return true;
    }),
  body(
    "password",
    "The password should be at least 4 characters long and should consist only english letters and digits"
  ).custom(async (password,{req}) => {
    const email= req.body.email;
    const user = await users.findOne({ email });
    const status = await bcrypt.compare(password, user.password);
    if (!status) {
      throw new Error("Wrong password");
    }
    return true;
  }),
];
