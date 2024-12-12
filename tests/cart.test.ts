import { Hono } from "hono";
import {
    addToCartHandler,
    removeFromCartHandler,
    getCartHandler,
    updateCartHandler,
} from "../src/controllers/cart.controller.ts";
import { expect, test, describe } from "@jest/globals";
import { MOCK_ENV } from "./mockEnv.ts";

const app = new Hono();

app.post("/api/cart", addToCartHandler);
app.delete("/api/cart", removeFromCartHandler);
app.get("/api/cart", getCartHandler);
app.put("/api/cart", updateCartHandler);

describe("Cart", () => {
    test("POST /api/cart", async () => {
        const res = await app.request("/api/cart", {
            method: "POST",
            body: JSON.stringify({
                userId: 1,
                productId: 101,
                quantity: 2,
            }),
        }, MOCK_ENV);

        expect(res.status).toBe(201);
    });

    test("DELETE /api/cart", async () => {
        const res = await app.request("/api/cart", {
            method: "DELETE",
            body: JSON.stringify({
                cartId: 1,
            }),
        }, MOCK_ENV);

        expect(res.status).toBe(204);
    });

    test("GET /api/cart", async () => {
        const res = await app.request("/api/cart", {
            method: "GET",
            headers: { Authorization: "Bearer mock-token" },
        }, MOCK_ENV);

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            data: expect.any(Object),
        });
    });

    test("PUT /api/cart", async () => {
        const res = await app.request("/api/cart", {
            method: "PUT",
            body: JSON.stringify({
                userId: 1,
                productId: 101,
                quantity: 3,
            }),
        }, MOCK_ENV);

        expect(res.status).toBe(204);
    });
});
