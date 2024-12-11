import { and, eq } from "drizzle-orm"
import { db } from "../database/db.js"
import { cart, type NewCart } from "../database/schema.js"
import { ERRORS } from "../constants/errors.js"

export const createItemInCart = async (data: NewCart) => {
    try {
        await db.insert(cart).values({
            userId: data.userId,
            productId: data.productId,
            quantity: data.quantity
        })
        return true
    } catch (error) {
        return false
    }
}

export const getUserCart = async (userId: number) => {
    try {
        const items = await db.select().from(cart).where(eq(cart.userId, userId))
        return items
    } catch (error) {
        return ERRORS.INTERNAL_SERVER_ERROR
    }
}

export const updateCartItem = async (data: NewCart) => {
    try {
        await db.update(cart).set({
            quantity: data.quantity
        }).where(and(
            eq(cart.userId, data.userId),
            eq(cart.productId, data.productId)
        ))
        return true
    } catch (error) {
        return false
    }
}

export const deleteCartItem = async (cartId: number) => {
    try {
        await db.delete(cart).where(eq(cart.id, cartId))
        return true
    } catch (error) {
        return false
    }
}