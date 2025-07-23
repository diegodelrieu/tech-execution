'use client';

import { type TodoItem, type TodoActions } from '@/types/todo';
import { TodoItemComponent } from './todo-item';

interface TodoListProperties {
  todos: TodoItem[];
  actions: TodoActions;
}

export function TodoList({ todos, actions }: TodoListProperties) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItemComponent
          key={todo.id}
          todo={todo}
          actions={actions}
          level={0}
        />
      ))}
    </div>
  );
}