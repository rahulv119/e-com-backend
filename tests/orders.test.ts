import { Hono } from "hono";
import {
    makeOrderHandler,
    getOrdersHandler,
    cancelOrderHandler,
} from "../src/controllers/order.controller.ts";
import { expect, test, describe } from "@jest/globals";
import { MOCK_ENV } from "./mockEnv.ts";

const app = new Hono();

app.post("/api/order", makeOrderHandler);
app.get("/api/order", getOrdersHandler);
app.delete("/api/order/:orderId", cancelOrderHandler);

// note: make an actual jwt token cuz the mock token is not valid
describe("Orders", () => {
    test("POST /api/order", async () => {
        const res = await app.request("/api/order", {
            method: "POST",
            headers: { Authorization: "Bearer mock-token" },
        }, MOCK_ENV);

        expect(res.status).toBe(201);
    });

    test("GET /api/order", async () => {
        const res = await app.request("/api/order", {
            method: "GET",
            headers: { Authorization: "Bearer mock-token" },
        }, MOCK_ENV);

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            data: expect.any(Array),
        });
    });

    test("DELETE /api/order/:orderId", async () => {
        const res = await app.request("/api/order/1", {
            method: "DELETE",
            headers: { Authorization: "Bearer mock-token" },
        }, MOCK_ENV);

        expect(res.status).toBe(204);
    });
});
