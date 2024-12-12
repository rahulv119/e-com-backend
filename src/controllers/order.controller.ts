import type { Context } from "hono";
import { verifyJWT } from "../utils/jwt.utils.ts";
import type { JWTPayload } from "hono/utils/jwt/types";
import { createOrder, deleteOrder, getUserOrders } from "../services/orders.service.ts";
import { ERRORS } from "../constants/errors.ts";
import { get } from "http";

export const makeOrderHandler = async(c: Context) => {
    const token = c.req.header("Authorization")
    if (!token) {
        return c.json({
            error: ERRORS.UNAUTHORIZED
        }, 401)
    }

    const payload = await verifyJWT(token) as JWTPayload
    const userId = payload.id as number

    const makeOrder = await createOrder({
        userId: userId,
        total: ""
    })

    if (!makeOrder) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500)
    }

    return c.json(null, 201)
}

export const getOrdersHandler = async(c: Context) => {
    const token = c.req.header("Authorization")
    if (!token) {
        return c.json({
            error: ERRORS.UNAUTHORIZED
        }, 401)
    }

    const payload = await verifyJWT(token) as JWTPayload
    const userId = payload.id as number

    const getOrders = await getUserOrders(userId)

    if (getOrders === ERRORS.INTERNAL_SERVER_ERROR) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500)
    }

    return c.json({
        data: getOrders
    }, 200)
}

export const cancelOrderHandler = async(c: Context) => {
    const token = c.req.header("Authorization")
    if (!token) {
        return c.json({
            error: ERRORS.UNAUTHORIZED
        }, 401)
    }

    const orderId = c.req.param("orderId") as string
    if (!orderId) {
        return c.json({
            error: ERRORS.MISSING_PARAMS
        }, 400)
    }

    const cancelOrder = await deleteOrder(Number(orderId))

    if (!cancelOrder) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500)
    }

    return c.json(null, 204)
}

