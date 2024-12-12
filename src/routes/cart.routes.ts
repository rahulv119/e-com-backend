import { Hono } from "hono";
import { addToCartHandler, getCartHandler, removeFromCartHandler, updateCartHandler } from "../controllers/cart.controller.ts";

const router = new Hono()

router.post("/add", addToCartHandler)
router.get("/", getCartHandler)
router.put("/update", updateCartHandler)
router.delete("/remove", removeFromCartHandler)

export default router