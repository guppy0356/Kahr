import type { useTodoPresenter } from '../hooks/useTodoPresenter'

type Props = ReturnType<typeof useTodoPresenter>

export const TodoList = ({ viewState, actions }: Props) => {
  const { todos, inputText, errorMessage, isLoading } = viewState
  const { onChangeInput, onSubmit, onToggle, onDelete } = actions

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>TODO List</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <input
          value={inputText}
          onChange={(e) => onChangeInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          placeholder="Enter todo..."
        />
        <button onClick={onSubmit}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id, todo.completed)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
