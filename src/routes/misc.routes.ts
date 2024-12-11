import { Hono } from "hono";
import { healthHandler } from "../controllers/misc.controller.js";

const router = new Hono();

router.get("/health", healthHandler);

export default router;