"use client";

import { useState } from "react";
import { TODO_MAX_LENGTH } from "@/utils/validation";

interface AddTodoProperties {
  onAdd: (title: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProperties) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex space-x-2">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a new todo..."
            maxLength={TODO_MAX_LENGTH}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
          <div className="text-xs text-gray-500 mt-1">
            {title.length}/{TODO_MAX_LENGTH} characters
          </div>
        </div>
        <button
          type="submit"
          disabled={!title.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </form>
  );
}
