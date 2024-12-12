import { Hono } from "hono";
import { loginHandler, registerHandler } from "../controllers/auth.controller.ts";

const router = new Hono()

router.post("/register", registerHandler)
router.post("/login", loginHandler)

export default router