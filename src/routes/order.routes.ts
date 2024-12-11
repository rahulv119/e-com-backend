import { Hono } from "hono";
import { cancelOrderHandler, getOrdersHandler, makeOrderHandler } from "../controllers/order.controller.js";


const router = new Hono()

router.post("/create", makeOrderHandler)
router.get("/", getOrdersHandler)
router.delete("/cancel", cancelOrderHandler)


export default router