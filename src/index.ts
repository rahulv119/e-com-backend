import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PORT } from './env.js'
import miscRouter from './routes/misc.routes.js'

const app = new Hono()

app.route("/api", miscRouter)

console.log(`Server is running on http://localhost:${PORT} 🥳`)

serve({
  fetch: app.fetch,
  port: PORT,
})
