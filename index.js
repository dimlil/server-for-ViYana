import cookieParser from "cookie-parser";
import express from "express";
import router from "./routes/index.mjs";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use('/', router)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Listening on port ${PORT}! Now its up to you...`));