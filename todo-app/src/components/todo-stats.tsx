'use client';

import { type TodoItem } from '@/types/todo';

interface TodoStatsProperties {
  todos: TodoItem[];
}

function countTodos(todos: TodoItem[]): { total: number; completed: number } {
  let total = 0;
  let completed = 0;

  for (const todo of todos) {
    total += 1;
    if (todo.completed) {
      completed += 1;
    }
    const childStats = countTodos(todo.children);
    total += childStats.total;
    completed += childStats.completed;
  }

  return { total, completed };
}

export function TodoStats({ todos }: TodoStatsProperties) {
  const { total, completed } = countTodos(todos);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (total === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-blue-800">
          Progress: {completed} of {total} todos completed
        </div>
        <div className="text-sm font-semibold text-blue-900">
          {percentage}%
        </div>
      </div>
      <div className="mt-2 bg-blue-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}