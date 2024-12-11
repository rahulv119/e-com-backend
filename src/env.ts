import dotenv from 'dotenv'

dotenv.config()

if (!process.env.PORT) {
    console.log('PORT is not defined')
    throw new Error('PORT is not defined')
}

export const PORT = parseInt(process.env.PORT, 10)