import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { DB_URL } from "../env.js"

const client = postgres(DB_URL)
export const db = drizzle(client)