import type { Context } from "hono";
import { ERRORS } from "../constants/errors.js";
import { createItemInCart, deleteCartItem, getUserCart, updateCartItem } from "../services/cart.service.js";
import { verifyJWT } from "../utils/jwt.utils.js";
import type { JWTPayload } from "hono/utils/jwt/types";

export const addToCartHandler = async(c: Context) => {
    const body = await c.req.json();
    if (!body.userId || !body.productId || !body.quantity) {
        return c.json({
            error: ERRORS.MISSING_PARAMS
        }, 400);
    }

    const addProduct = await createItemInCart(body);
    if (!addProduct) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500);
    }

    return c.json(null, 201);
}

export const removeFromCartHandler = async(c: Context) => {
    const body = await c.req.json();
    if (!body.cartId) {
        return c.json({
            error: ERRORS.MISSING_PARAMS
        }, 400);
    }

    const removeProduct = await deleteCartItem(body.cartId);
    if (!removeProduct) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500);
    }

    return c.json(null, 204);
}

export const getCartHandler = async(c: Context) => {
    const token = c.req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return c.json({
            error: ERRORS.UNAUTHORIZED
        }, 401);
    }

    const payload = verifyJWT(token) as JWTPayload;
    const userId = payload.userId;

    const cart = await getUserCart(Number(userId));
    if (cart === ERRORS.INTERNAL_SERVER_ERROR) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500);
    }

    return c.json({
        data: cart
    }, 200);
}

export const updateCartHandler = async(c: Context) => {
    const body = await c.req.json();
    if (!body.userId || !body.productId || !body.quantity) {
        return c.json({
            error: ERRORS.MISSING_PARAMS
        }, 400);
    }

    const updateProduct = await updateCartItem(body);
    if (!updateProduct) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500);
    }

    return c.json(null, 204);
}