import { Hono } from "hono";
import { getProductHandler, getProductsHandler } from "../controllers/product.controller.js";

const router = new Hono()

router.get("/", getProductsHandler)
router.get("/:id", getProductHandler)

export default router