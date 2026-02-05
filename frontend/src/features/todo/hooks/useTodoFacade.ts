import { useState, useCallback, useEffect } from 'react'
import { client } from '@/lib/client'

export type Todo = { id: string; text: string; completed: boolean }

export const useTodoFacade = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const fetchTodos = useCallback(async () => {
    setIsFetching(true)
    try {
      const res = await client.todos.$get()
      if (res.ok) {
        const data = await res.json()
        setTodos(data.todos)
      }
    } finally {
      setIsFetching(false)
    }
  }, [])

  const addTodo = useCallback(async (text: string) => {
    const res = await client.todos.$post({ json: { text } })
    if (res.ok) await fetchTodos()
  }, [fetchTodos])

  const toggleTodo = useCallback(async (id: string, completed: boolean) => {
    const endpoint = client.todos[':id']
    const res = await endpoint.$patch({ param: { id }, json: { completed } } as Parameters<typeof endpoint.$patch>[0])
    if (res.ok) await fetchTodos()
  }, [fetchTodos])

  const deleteTodo = useCallback(async (id: string) => {
    const res = await client.todos[':id'].$delete({ param: { id } })
    if (res.ok) await fetchTodos()
  }, [fetchTodos])

  useEffect(() => { fetchTodos() }, [fetchTodos])

  return { todos, isFetching, addTodo, toggleTodo, deleteTodo }
}
