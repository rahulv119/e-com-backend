import type { Context } from "hono";
import { ERRORS } from "../constants/errors.ts";
import { createUser, getUserByEmail } from "../services/users.service.ts";
import { comparePassword, encryptPassword } from "../utils/hash.utils.ts";
import { signJWT } from "../utils/jwt.utils.ts";

export const registerHandler = async (c: Context) => {
    const body = await c.req.json()
    if (!body.name || !body.email || !body.password) {
        return c.json({
            error: ERRORS.MISSING_FIELDS
        }, 400)
    }

    const hashPassword = await encryptPassword(body.password)

    const insertUser = await createUser({
        name: body.name,
        email: body.email,
        hashPassword,
    })

    if (!insertUser) {
        return c.json({
            error: ERRORS.INTERNAL_SERVER_ERROR
        }, 500)
    }

    return c.json(null, 201)
}

export const loginHandler = async (c: Context) => {
    const body = await c.req.json()
    if (!body.email || !body.password) {
        return c.json({
            error: ERRORS.MISSING_FIELDS
        }, 400)
    }

    const fetchUser = await getUserByEmail(body.email)
    if (!('id' in fetchUser)) {
        return c.json({
            error: ERRORS.USER_NOT_FOUND
        }, 404)
    }

    const isValid = await comparePassword(body.password, fetchUser.hashPassword)
    if (!isValid) {
        return c.json({
            error: ERRORS.UNAUTHORIZED
        }, 401)
    }

    const token = signJWT(fetchUser.id)
    return c.json({
        data: {
            token
        }
    }, 200)
}