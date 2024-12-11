import { eq } from "drizzle-orm"
import { db } from "../database/db.js"
import { users, type NewUser, type User } from "../database/schema.js"
import { ERRORS, type ReturnError } from "../constants/errors.js"

export const createUser = async (data: NewUser) => {
    try {
        await db.insert(users).values({
            name: data.name,
            email: data.email,
            hashPassword: data.hashPassword,
        })
        return true
    } catch (error) {
        return error
    }
}

export const getUserByEmail = async (email: string): Promise<User | ReturnError> => {
    try {
        const [user] = await db.select().from(users).where(eq(users.email, email))
        if (user === undefined) {
            return ERRORS.USER_NOT_FOUND
        }
        return user
    } catch (error) {
        return ERRORS.INTERNAL_SERVER_ERROR
    }
}

export const getUserById = async (id: number): Promise<User | ReturnError> => {
    try {
        const [user] = await db.select().from(users).where(eq(users.id, id))
        if (user === undefined) {
            return ERRORS.USER_NOT_FOUND
        }
        return user
    } catch (error) {
        return ERRORS.INTERNAL_SERVER_ERROR
    }
}