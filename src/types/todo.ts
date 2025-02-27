export type TodoPriority = 'low' | 'medium' | 'high';
export type TodoCategory = 'personal' | 'work' | 'shopping' | 'health';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: TodoPriority;
  category: TodoCategory;
}

export type TodoFilters = {
  status: 'all' | 'active' | 'completed';
  priority: TodoPriority | 'all';
  category: TodoCategory | 'all';
  search: string;
};