import {body} from 'express-validator'

export const verifyUser = [
  body(
    "email",
    "The email should be in following format (mailbox @ domainname)"
  ).isEmail(),
  body(
    "password",
    "The password should be at least 4 characters long and should consist only english letters and digits"
  ).custom((value) => {
    const regex = /[A-Za-z0-9]+/g;
    if (value < 4 || !value.match(regex)) {
      throw new Error(
        `The password should be at least 4 characters long and should consist only english letters and digits`
      );
    }
    return true;
  }),
];
