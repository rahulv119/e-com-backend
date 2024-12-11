import { Hono } from "hono";
import { addToCartHandler, getCartHandler, removeFromCartHandler, updateCartHandler } from "../controllers/cart.controller.js";

const router = new Hono()

router.post("/add", addToCartHandler)
router.post("/remove", removeFromCartHandler)
router.get("/", getCartHandler)
router.put("/update", updateCartHandler)

export default router