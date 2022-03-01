import { body } from "express-validator";

export const loginVerification = [
  body(
    "email",
    "The email should be in following format (mailbox @ domainname)"
  ).isEmail(),
  body(
    "password",
    "The password should be at least 4 characters long and should consist only english letters and digits"
  )
    .isLength({ min: 4 })
    .custom((password) => {
      const regex = /([A-Z]*[a-z])\w+\d+/g;
      if (regex.exec(password) == null) {
        throw new Error(
          "The password should consist only english letters and digits. Both letters and digits are required"
        );
      }
      return true
    }),
];
