import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.aid;
  if (token == null) return res.sendStatus(401).send("Please login.");

  jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    if (err) return res.sendStatus(403).send(error.message);
    next();
  });
};
