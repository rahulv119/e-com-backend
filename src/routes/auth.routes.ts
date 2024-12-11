import { Hono } from "hono";
import { loginHandler, logoutHandler, registerHandler } from "../controllers/auth.controller.js";

const router = new Hono()

router.post("/register", registerHandler)
router.post("/login", loginHandler)
router.post("/logout", logoutHandler)

export default router