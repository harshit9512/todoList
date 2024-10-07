import express from "express";

import { register } from "../controller/user.controller.js";
import { login } from "../controller/user.controller.js";
import { logout } from "../controller/user.controller.js";

const router = express.Router();

router.post("/sign-up", register);
router.post("/sign-in", login);
router.get("/logout", logout);

  // Example protected route
//   app.get('/protected', verifyToken, (req, res) => {
//     res.json({ message: 'You have access' });
//   });

export default router;
