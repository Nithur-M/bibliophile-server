import express from "express";
const router = express.Router();

import { signup } from "../controllers/users.js";

router.post("/signup", signup);

export default router;
