export const TODO_MAX_LENGTH = 500;

export function validateTodoTitle(title: string): { isValid: boolean; error?: string } {
  const trimmedTitle = title.trim();
  
  if (!trimmedTitle) {
    return { isValid: false, error: 'Todo title cannot be empty' };
  }
  
  if (trimmedTitle.length > TODO_MAX_LENGTH) {
    return { 
      isValid: false, 
      error: `Todo title cannot exceed ${TODO_MAX_LENGTH} characters (current: ${trimmedTitle.length})` 
    };
  }
  
  return { isValid: true };
}

export function truncateText(text: string, maxLength: number = TODO_MAX_LENGTH): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}