'use client';

import { useState } from 'react';
import { type TodoItem, type TodoActions } from '@/types/todo';
import { AddTodo } from './add-todo';

interface TodoItemProperties {
  todo: TodoItem;
  actions: TodoActions;
  level?: number;
}

export function TodoItemComponent({ todo, actions, level = 0 }: TodoItemProperties) {
  const [showAddChild, setShowAddChild] = useState(false);
  const hasChildren = todo.children.length > 0;
  const isExpanded = todo.expanded ?? false;

  const handleAddChild = (title: string) => {
    actions.onAddChild(todo.id, title);
    setShowAddChild(false);
  };

  return (
    <div className="w-full">
      <div 
        className="flex items-center space-x-2 p-2 border rounded-lg bg-white shadow-sm"
        style={{ marginLeft: `${level * 20}px` }}
      >
        {hasChildren && (
          <button
            onClick={() => actions.onToggleExpanded(todo.id)}
            className="w-4 h-4 flex items-center justify-center text-gray-600 hover:text-gray-800"
            type="button"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        )}
        {!hasChildren && <div className="w-4" />}
        
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => actions.onToggleComplete(todo.id)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        
        <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {todo.title}
        </span>
        
        <button
          onClick={() => setShowAddChild(!showAddChild)}
          className="px-2 py-1 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
          type="button"
        >
          Add Child
        </button>
        
        <button
          onClick={() => actions.onDelete(todo.id)}
          className="px-2 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
          type="button"
        >
          Delete
        </button>
      </div>

      {showAddChild && (
        <div style={{ marginLeft: `${(level + 1) * 20}px` }} className="mt-2">
          <AddTodo onAdd={handleAddChild} />
        </div>
      )}

      {isExpanded && hasChildren && (
        <div className="mt-2 space-y-2">
          {todo.children.map((child) => (
            <TodoItemComponent
              key={child.id}
              todo={child}
              actions={actions}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}