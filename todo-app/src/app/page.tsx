'use client';

import { useState } from 'react';
import { v4 as uuidVersion4 } from 'uuid';
import { type TodoItem, type TodoActions } from '@/types/todo';
import { AddTodo } from '@/components/add-todo';
import { TodoList } from '@/components/todo-list';
import { updateTodoById, deleteTodoById, addChildTodo as addChildTodoHelper } from '@/utils/todo-helpers';

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (title: string) => {
    const newTodo: TodoItem = {
      id: uuidVersion4(),
      title,
      completed: false,
      children: [],
      expanded: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: string) => {
    setTodos(previousTodos => 
      updateTodoById(previousTodos, id, todo => ({ 
        ...todo, 
        completed: !todo.completed 
      }))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(previousTodos => deleteTodoById(previousTodos, id));
  };

  const addChildTodo = (parentId: string, title: string) => {
    const newTodo: TodoItem = {
      id: uuidVersion4(),
      title,
      completed: false,
      children: [],
      expanded: false,
    };
    setTodos(previousTodos => addChildTodoHelper(previousTodos, parentId, newTodo));
  };

  const toggleExpanded = (id: string) => {
    setTodos(previousTodos => 
      updateTodoById(previousTodos, id, todo => ({ 
        ...todo, 
        expanded: !todo.expanded 
      }))
    );
  };

  const actions: TodoActions = {
    onToggleComplete: toggleComplete,
    onDelete: deleteTodo,
    onAddChild: addChildTodo,
    onToggleExpanded: toggleExpanded,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Hierarchical Todo App
        </h1>
        
        <AddTodo onAdd={addTodo} />
        <TodoList todos={todos} actions={actions} />
        
        {todos.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No todos yet. Add one above!
          </div>
        )}
      </div>
    </div>
  );
}
