'use client';

import { type TodoItem } from '@/types/todo';
import { TodoItemComponent } from './todo-item';

interface TodoListProperties {
  todos: TodoItem[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggleComplete, onDelete }: TodoListProperties) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItemComponent
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}