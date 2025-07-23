'use client';

import { useState } from 'react';
import { v4 as uuidVersion4 } from 'uuid';
import { type TodoItem } from '@/types/todo';
import { AddTodo } from '@/components/add-todo';
import { TodoList } from '@/components/todo-list';

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (title: string) => {
    const newTodo: TodoItem = {
      id: uuidVersion4(),
      title,
      completed: false,
      children: [],
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Todo App
        </h1>
        
        <AddTodo onAdd={addTodo} />
        <TodoList 
          todos={todos}
          onToggleComplete={toggleComplete}
          onDelete={deleteTodo}
        />
        
        {todos.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No todos yet. Add one above!
          </div>
        )}
      </div>
    </div>
  );
}
