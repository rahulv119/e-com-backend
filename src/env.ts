import dotenv from 'dotenv'

dotenv.config()

if (!process.env.PORT) {
    throw new Error('PORT is not defined')
}

if(!process.env.DB_URL) {
    throw new Error('DB_URL is not defined')
}

export const PORT = parseInt(process.env.PORT, 10)
export const DB_URL = process.env.DB_URL