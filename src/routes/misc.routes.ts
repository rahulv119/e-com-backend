import { Hono } from "hono";
import { healthHandler } from "../controllers/misc.controller.ts";

const router = new Hono();

router.get("/health", healthHandler);

export default router;