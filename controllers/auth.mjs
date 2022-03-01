import users from "../models/user.mjs";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401).send("Please login.");

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).send(error.message);
    req.user = user;
    next();
  });
};
