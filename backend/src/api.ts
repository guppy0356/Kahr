import { Hono } from 'hono'

export type Todo = { id: string; text: string; completed: boolean }
export let todos: Todo[] = []

// Method chaining required for Hono RPC type inference
export const api = new Hono()
  .get('/todos', (c) => c.json({ todos }))
  .post('/todos', async (c) => {
    const { text } = await c.req.json<{ text: string }>()
    const todo: Todo = { id: crypto.randomUUID(), text, completed: false }
    todos.push(todo)
    return c.json(todo, 201)
  })
  .patch('/todos/:id', async (c) => {
    const id = c.req.param('id')
    const body = await c.req.json<{ completed?: boolean; text?: string }>()
    const todo = todos.find((t) => t.id === id)
    if (!todo) return c.json({ error: 'Not found' }, 404)
    if (body.completed !== undefined) todo.completed = body.completed
    if (body.text !== undefined) todo.text = body.text
    return c.json(todo)
  })
  .delete('/todos/:id', (c) => {
    const id = c.req.param('id')
    const idx = todos.findIndex((t) => t.id === id)
    if (idx === -1) return c.json({ error: 'Not found' }, 404)
    todos.splice(idx, 1)
    return c.json({ success: true })
  })

export type AppType = typeof api
