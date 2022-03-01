import { Router } from "express";
import { validationResult } from "express-validator";
import { verifyUser } from "../controllers/auth.mjs";
import { login } from "../controllers/login.mjs";
import { loginVerification } from "../verifications/login.mjs";
import Post from "../models/post.mjs";
const router = Router();

router.get("/", async (req, res) => {
  res.send("Hello");
});
router.get("/api/allPosts", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});
router.post("/api/create", verifyUser, async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({
    title,
    content,
  });
  try {
    await newPost.save();
  } catch (error) {
    res.status(500).send(error.message);
  }
  res.status(201).send("ok");
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
