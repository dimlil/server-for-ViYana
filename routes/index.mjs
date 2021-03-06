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
  res.status(200).send(posts);
});
router.get("/api/post/:id", async (req, res) => {
  try {
    const post = await Post.find({ _id: req.params.id });
    res.status(200).send(post);
  } catch (error) {
    res
      .status(404)
      .send(`The post is not found please check ID. Error: ${error.message}`);
  }
});
router.post("/api/create", verifyUser, async (req, res) => {
  const { title, about, content } = req.body;
  const newPost = new Post({
    title,
    about,
    content,
  });
  try {
    await newPost.save();
  } catch (error) {
    res.status(500).send(error.message);
  }
  res.status(201).send("post is successfully created");
});
router.delete("/api/delete/:id", verifyUser, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).send("Post is successfully deleted");
  } catch (error) {
    res
      .status(404)
      .send(`The post is not found please check ID. Error: ${error.message}`);
  }
});
router.put("/api/edit/:id", verifyUser, async (req, res) => {
  const { title, about, content } = req.body;
  try {
    await Post.updateOne(
      { _id: req.params.id },
      { $set: { title, about, content } }
    );
    res.status(200).send("Post is successfully edited");
  } catch (error) {
    res
      .status(404)
      .send(`The post is not found please check ID. Error: ${error.message}`);
  }
});
router.post("/api/login", loginVerification, login, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors.array()[0].msg);
  }
  const token = req.body.token;
  const email = req.body.email;
  res
    .status(200)
    .cookie("aid", token, {
      sameSite: true,
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    })
    .send(`User ${email} is successfully logged in`);
});
router.post("/api/logout", (req, res) => {
  try {
    res
      .clearCookie("aid", { path: "/" })
      .status(200)
      .send("Successfully logged out");
  } catch (error) {
    res.status(400).send(`Error: ${error}`);
  }
});
export default router;
