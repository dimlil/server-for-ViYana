import users from "../models/user.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ email });
    if (!user) {
      throw new Error("Email is not found");
    }
    const status = await bcrypt.compare(password, user.password);
    if (!status) {
      throw new Error("Wrong password");
    }
    const token = await jwt.sign(email, process.env.TOKEN_SECRET);
    req.body.token = token;
    next();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
