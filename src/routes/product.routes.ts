import { Hono } from "hono";
import { createProductHandler, deleteProductHandler, getProductHandler, getProductsHandler, updateProductHandler } from "../controllers/product.controller.ts";

const router = new Hono()

router.get("/", getProductsHandler)
router.get("/:id", getProductHandler)
router.post("/", createProductHandler)
router.put("/:id", updateProductHandler)
router.delete("/:id", deleteProductHandler)

export default router