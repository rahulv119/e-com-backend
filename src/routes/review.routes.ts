import { Hono } from "hono";
import { addReviewHandler, deleteReviewHandler, getReviewHandler, getReviewsHandler, updateReviewHandler } from "../controllers/review.controller.ts";

const router = new Hono()

router.post("/add", addReviewHandler)
router.get("/", getReviewsHandler)
router.get("/:id", getReviewHandler)
router.put("/:id", updateReviewHandler)
router.delete("/:id", deleteReviewHandler)

export default router