"use client";

import { useState } from "react";
import { type TodoItem, type TodoActions } from "@/types/todo";
import { AddTodo } from "./add-todo";
import { EditableText } from "./editable-text";

interface TodoItemProperties {
  todo: TodoItem;
  actions: TodoActions;
  level?: number;
}

export function TodoItemComponent({
  todo,
  actions,
  level = 0,
}: TodoItemProperties) {
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
        className="flex items-center space-x-2 p-3 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        style={{ marginLeft: `${level * 24}px` }}
      >
        {hasChildren && (
          <button
            onClick={() => actions.onToggleExpanded(todo.id)}
            className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
            type="button"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        )}
        {!hasChildren && <div className="w-5 flex-shrink-0" />}

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => actions.onToggleComplete(todo.id)}
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <EditableText
            text={todo.title}
            onSave={(newTitle) => actions.onEdit(todo.id, newTitle)}
            className={
              todo.completed ? "line-through text-gray-500" : "text-gray-900"
            }
          />
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={() => setShowAddChild(!showAddChild)}
            className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors font-medium whitespace-nowrap"
            type="button"
          >
            <span className="hidden sm:inline">+ Child</span>
            <span className="sm:hidden">+</span>
          </button>

          <button
            onClick={() => {
              const hasChildren = todo.children.length > 0;
              const confirmMessage = hasChildren
                ? `Delete "${todo.title}" and all its ${todo.children.length} child todo(s)?`
                : `Delete "${todo.title}"?`;

              if (window.confirm(confirmMessage)) {
                actions.onDelete(todo.id);
              }
            }}
            className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors font-medium whitespace-nowrap"
            type="button"
          >
            <span className="hidden sm:inline">Delete</span>
            <span className="sm:hidden">×</span>
          </button>
        </div>
      </div>

      {showAddChild && (
        <div style={{ marginLeft: `${(level + 1) * 24}px` }} className="mt-3">
          <div className="bg-gray-50 p-3 rounded-lg border">
            <AddTodo onAdd={handleAddChild} />
          </div>
        </div>
      )}

      {isExpanded && hasChildren && (
        <div className="mt-3 space-y-2">
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
