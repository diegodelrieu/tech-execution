"use client";

import { v4 as uuidVersion4 } from "uuid";
import { useMemo } from "react";
import { type TodoItem, type TodoActions } from "@/types/todo";
import { AddTodo } from "@/components/add-todo";
import { TodoList } from "@/components/todo-list";
import { ErrorBoundary } from "@/components/error-boundary";
import { TodoStats } from "@/components/todo-stats";
import {
  updateTodoById,
  deleteTodoById,
  addChildTodo as addChildTodoHelper,
} from "@/utils/todo-helpers";
import { toggleTodoCompletion } from "@/utils/completion-helpers";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { validateTodoTitle } from "@/utils/validation";

export default function Home() {
  const [todos, setTodos] = useLocalStorage<TodoItem[]>(
    "hierarchical-todos",
    []
  );

  const addTodo = (title: string) => {
    const validation = validateTodoTitle(title);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    const newTodo: TodoItem = {
      id: uuidVersion4(),
      title: title.trim(),
      completed: false,
      children: [],
      expanded: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: string) => {
    setTodos((previousTodos: TodoItem[]) =>
      updateTodoById(previousTodos, id, (todo) =>
        toggleTodoCompletion(todo, !todo.completed)
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((previousTodos: TodoItem[]) => deleteTodoById(previousTodos, id));
  };

  const addChildTodo = (parentId: string, title: string) => {
    const validation = validateTodoTitle(title);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    const newTodo: TodoItem = {
      id: uuidVersion4(),
      title: title.trim(),
      completed: false,
      children: [],
      expanded: false,
    };
    setTodos((previousTodos: TodoItem[]) =>
      addChildTodoHelper(previousTodos, parentId, newTodo)
    );
  };

  const toggleExpanded = (id: string) => {
    setTodos((previousTodos: TodoItem[]) =>
      updateTodoById(previousTodos, id, (todo) => ({
        ...todo,
        expanded: !todo.expanded,
      }))
    );
  };

  const editTodo = (id: string, newTitle: string) => {
    const validation = validateTodoTitle(newTitle);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setTodos((previousTodos: TodoItem[]) =>
      updateTodoById(previousTodos, id, (todo) => ({
        ...todo,
        title: newTitle.trim(),
      }))
    );
  };

  const actions: TodoActions = useMemo(
    () => ({
      onToggleComplete: toggleComplete,
      onDelete: deleteTodo,
      onAddChild: addChildTodo,
      onToggleExpanded: toggleExpanded,
      onEdit: editTodo,
    }),
    []
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Hierarchical Todo App
          </h1>

          <TodoStats todos={todos} />

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <AddTodo onAdd={addTodo} />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <TodoList todos={todos} actions={actions} />

            {todos.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                No todos yet. Add one above!
              </div>
            )}
          </div>

          <div className="text-center text-xs text-gray-400 mt-4">
            Data is automatically saved to your browser&apos;s local storage
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
