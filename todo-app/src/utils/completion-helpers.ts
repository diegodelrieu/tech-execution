import { type TodoItem } from '@/types/todo';

export function toggleTodoCompletion(todo: TodoItem, completed: boolean): TodoItem {
  return {
    ...todo,
    completed,
    children: todo.children.map(child => toggleTodoCompletion(child, completed)),
  };
}

export function updateParentCompletion(todos: TodoItem[]): TodoItem[] {
  return todos.map(todo => {
    const updatedChildren = updateParentCompletion(todo.children);
    const allChildrenCompleted = updatedChildren.length > 0 && updatedChildren.every(child => child.completed);
    
    return {
      ...todo,
      children: updatedChildren,
      completed: updatedChildren.length > 0 ? allChildrenCompleted : todo.completed,
    };
  });
}