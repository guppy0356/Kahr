import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import { api } from './api'

const app = new Hono()

app.use(renderer)
app.use('/api/*', cors({ origin: 'http://localhost:5174' }))

app.get('/', (c) => c.render(<h1>Hello!</h1>))

app.route('/api', api)

export default app
export type { AppType } from './api'
