import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../env.js"

export const signJWT = (userId: number) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" })
}

export const verifyJWT = (token: string) => {
    return jwt.verify(token, JWT_SECRET)
}