import { useState, useCallback } from 'react'
import type { useTodoFacade } from './useTodoFacade'

type Facade = ReturnType<typeof useTodoFacade>

export const useTodoPresenter = (facade: Facade) => {
  const [inputText, setInputText] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = useCallback(async () => {
    if (!inputText.trim()) {
      setErrorMessage('Please enter todo text')
      return
    }
    try {
      await facade.addTodo(inputText)
      setInputText('')
      setErrorMessage(null)
    } catch {
      setErrorMessage('Failed to add todo')
    }
  }, [inputText, facade])

  const handleToggle = useCallback(async (id: string, completed: boolean) => {
    try {
      await facade.toggleTodo(id, !completed)
    } catch {
      setErrorMessage('Failed to update todo')
    }
  }, [facade])

  const handleDelete = useCallback(async (id: string) => {
    try {
      await facade.deleteTodo(id)
    } catch {
      setErrorMessage('Failed to delete todo')
    }
  }, [facade])

  return {
    viewState: {
      todos: facade.todos,
      inputText,
      errorMessage,
      isLoading: facade.isFetching,
    },
    actions: {
      onChangeInput: setInputText,
      onSubmit: handleSubmit,
      onToggle: handleToggle,
      onDelete: handleDelete,
    },
  }
}
