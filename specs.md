# Specs

Create a new React project using create-next-app.

- Implement a todo app that allows users to create, read, update, and delete (CRUD) todo items.
  The todo app should have a tree-like structure, where each todo item can have child todo items, forming a recursive hierarchy.
  All CRUD operations should be performed locally within the client state, without relying on any server-side functionality or APIs.
  State should save to and load from localStorage
  The app should display the todo items in a nested list format, reflecting the tree structure.
  Users should be able to expand and collapse the child todo items.
  Each todo item should have the following properties:
  Title (string)
  Completed (boolean)
  Implement the following features:
  Add a new todo item as a child of an existing todo item or as a root-level item.
  Edit the properties of a todo item.
  Mark a todo item as completed/uncompleted.
  Delete a todo item and all its child items.
  Use appropriate React components, state management (e.g., useState, useReducer), and props to structure the app.
  Implement a minimal user interface
  Ensure proper error handling and validation for user inputs.
  Write clean, readable, and maintainable code.
  Make the UI somewhat decent looking using tailwind (minimal styling)
