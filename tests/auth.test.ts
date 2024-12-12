import { Hono } from "hono"
import { registerHandler, loginHandler } from "../src/controllers/auth.controller.ts"
import { expect, test, describe } from "@jest/globals"
import { MOCK_ENV } from "./mockEnv.ts"

const app = new Hono()

app.post("/api/auth/register", registerHandler)
app.post("/api/auth/login", loginHandler)

describe("Auth", () => {
    test("POST /api/auth/register", async () => {
        const res = await app.request("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                name: "Sample User",
                email: "sampleuser@gmail.com",
                password: "password"
            }),
        }, MOCK_ENV)
        expect(res.status).toBe(201)
    })

    test("POST /api/auth/login", async () => {
        const res = await app.request("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: "sampleuser@gmail.com",
                password: "password"
            }),
        }, MOCK_ENV)
        expect(res.status).toBe(200)
        expect(res.body).toEqual({
            data: {
                token: expect.any(String)
            }
        })
    })
})