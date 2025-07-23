import { type TodoItem } from '@/types/todo';

export function findTodoById(todos: TodoItem[], id: string): TodoItem | null {
  for (const todo of todos) {
    if (todo.id === id) {
      return todo;
    }
    const found = findTodoById(todo.children, id);
    if (found) {
      return found;
    }
  }
  return null;
}

export function updateTodoById(
  todos: TodoItem[],
  id: string,
  updater: (todo: TodoItem) => TodoItem
): TodoItem[] {
  return todos.map(todo => {
    if (todo.id === id) {
      return updater(todo);
    }
    return {
      ...todo,
      children: updateTodoById(todo.children, id, updater),
    };
  });
}

export function deleteTodoById(todos: TodoItem[], id: string): TodoItem[] {
  return todos
    .filter(todo => todo.id !== id)
    .map(todo => ({
      ...todo,
      children: deleteTodoById(todo.children, id),
    }));
}

export function addChildTodo(
  todos: TodoItem[],
  parentId: string,
  childTodo: TodoItem
): TodoItem[] {
  return todos.map(todo => {
    if (todo.id === parentId) {
      return {
        ...todo,
        children: [...todo.children, childTodo],
        expanded: true,
      };
    }
    return {
      ...todo,
      children: addChildTodo(todo.children, parentId, childTodo),
    };
  });
}