import { Router } from "express";
import { validationResult } from "express-validator";
import { verifyUser } from "../controllers/auth.mjs";
const router = Router();

router.get("/", async (req, res) => {
  res.send("Hello");
});
router.post('/create',verifyUser,(req,res)=>{
  const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.send(errors.array()[0].msg)
    }
  res.send('ok')
})
export default router