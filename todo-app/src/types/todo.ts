export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  children: TodoItem[];
}