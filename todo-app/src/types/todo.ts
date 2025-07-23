export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  children: TodoItem[];
  expanded?: boolean;
}

export interface TodoActions {
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string, title: string) => void;
  onToggleExpanded: (id: string) => void;
}