import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { api } from './api'

const app = new Hono()

app.use('/api/*', cors({ origin: 'http://localhost:5174' }))

app.route('/api', api)

export default app
export type { AppType } from './api'
