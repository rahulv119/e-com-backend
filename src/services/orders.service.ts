import { and, eq } from "drizzle-orm";
import { db } from "../database/db.ts";
import { cart, orders, type NewOrder } from "../database/schema.ts";
import { ERRORS } from "../constants/errors.ts";

export const createOrder = async (data: NewOrder) => {
    try {
        await db.transaction(async(tx) => {
            const getCartItems = await tx.select().from(cart).where(and(
                eq(cart.userId, data.userId),
                eq(cart.status, "active")
            ))

            if (!getCartItems.length) {
                return false;
            }

            const total = getCartItems.reduce((acc, item) => {
                return acc + item.quantity
            }, 0)

            await tx.insert(orders).values({
                userId: data.userId,
                total: total.toString(),
                status: "pending"
            })
        })
    } catch(error) {
        return false;
    }
}

export const getUserOrders = async (userId: number) => {
    try {
        const getOrders = await db.select().from(orders).where(eq(orders.userId, userId))
        if (getOrders.length == 0) {
            return false;
        }
        return getOrders
    } catch (error) {
        return ERRORS.INTERNAL_SERVER_ERROR
    }
}

export const updateOrderStatus = async (orderId: number, status: string) => {
    try {
        await db.update(orders).set({
            status: status as "pending" | "shipped" | "delivered" | "cancelled"
        }).where(eq(orders.id, orderId))
        return true
    } catch (error) {
        return false
    }
}

export const deleteOrder = async (orderId: number) => {
    try {
        await db.delete(orders).where(eq(orders.id, orderId))
        return true
    } catch (error) {
        return false
    }
}
