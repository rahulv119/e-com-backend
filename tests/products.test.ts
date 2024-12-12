import { Hono } from "hono";
import {
    getProductsHandler,
    getProductHandler,
    getProductByCategoryHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler
} from "../src/controllers/product.controller.ts";
import { expect, test, describe } from "@jest/globals";
import { MOCK_ENV } from "./mockEnv.ts";

const app = new Hono();

app.get("/api/products", getProductsHandler);
app.get("/api/products/:id", getProductHandler);
app.get("/api/products/category/:category", getProductByCategoryHandler);
app.post("/api/products", createProductHandler);
app.put("/api/products/:id", updateProductHandler);
app.delete("/api/products/:id", deleteProductHandler);

describe("Products", () => {
    test("GET /api/products", async () => {
        const res = await app.request("/api/products", {
            method: "GET"
        }, MOCK_ENV);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            data: expect.any(Array)
        });
    });

    test("GET /api/products/:id", async () => {
        const res = await app.request("/api/products/1", {
            method: "GET"
        }, MOCK_ENV);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            data: expect.any(Object)
        });
    });

    test("GET /api/products/category/:category", async () => {
        const res = await app.request("/api/products/category/electronics", {
            method: "GET"
        }, MOCK_ENV);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            data: expect.any(Array)
        });
    });

    test("POST /api/products", async () => {
        const res = await app.request("/api/products", {
            method: "POST",
            body: JSON.stringify({
                name: "Sample Product",
                description: "Sample Description",
                category: "electronics",
                price: 99.99,
                stock: 10,
                imageUrl: "http://example.com/image.jpg"
            })
        }, MOCK_ENV);
        expect(res.status).toBe(201);
    });

    test("PUT /api/products/:id", async () => {
        const res = await app.request("/api/products/1", {
            method: "PUT",
            body: JSON.stringify({
                name: "Updated Product",
                description: "Updated Description",
                category: "electronics",
                price: 79.99,
                stock: 5,
                imageUrl: "http://example.com/updated-image.jpg"
            })
        }, MOCK_ENV);
        expect(res.status).toBe(200);
    });

    test("DELETE /api/products/:id", async () => {
        const res = await app.request("/api/products/1", {
            method: "DELETE"
        }, MOCK_ENV);
        expect(res.status).toBe(200);
    });
});
