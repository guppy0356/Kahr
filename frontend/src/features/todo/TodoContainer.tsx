import { useTodoFacade } from './hooks/useTodoFacade'
import { useTodoPresenter } from './hooks/useTodoPresenter'
import { TodoList } from './components/TodoList'

export const TodoContainer = () => {
  const facade = useTodoFacade()
  const presenter = useTodoPresenter(facade)
  return <TodoList {...presenter} />
}
