import { Router } from "express";
import { validationResult } from "express-validator";
import { verifyUser } from "../controllers/auth.mjs";
import { login } from "../controllers/login.mjs";
import { loginVerification } from "../verifications/login.mjs";
const router = Router();

router.get("/", async (req, res) => {
  res.send("Hello");
});
router.post("/api/create", verifyUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors.array()[0].msg);
  }
  res.send("ok");
});
router.post("/api/login", loginVerification, login, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors.array()[0].msg);
  }
  const token = req.body.token;
  res.send(token);
});
export default router;
