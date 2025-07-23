'use client';

import { type TodoItem } from '@/types/todo';

interface TodoItemProperties {
  todo: TodoItem;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItemComponent({ todo, onToggleComplete, onDelete }: TodoItemProperties) {
  return (
    <div className="flex items-center space-x-2 p-2 border rounded-lg bg-white shadow-sm">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-2 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
        type="button"
      >
        Delete
      </button>
    </div>
  );
}