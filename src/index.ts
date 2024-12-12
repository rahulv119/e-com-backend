import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PORT } from './env.ts'
import miscRouter from './routes/misc.routes.ts'
import authRouter from './routes/auth.routes.ts'
import productRouter from './routes/product.routes.ts'
import cartRouter from './routes/cart.routes.ts'
import orderRouter from './routes/order.routes.ts'

const app = new Hono()

app.route("/api", miscRouter)
app.route("/api/auth", authRouter)
app.route("/api/products", productRouter)
app.route("/api/cart", cartRouter)
app.route("/api/orders", orderRouter)

console.log(`Server is running on http://localhost:${PORT} 🥳`)

serve({
  fetch: app.fetch,
  port: PORT,
})
