import { useState, useEffect } from 'react';
import { ListTodo } from 'lucide-react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import TodoFiltersComponent from './components/TodoFilters';
import { Todo, TodoFilters } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      return JSON.parse(saved, (key, value) => {
        if (key === 'createdAt' || key === 'dueDate') {
          return value ? new Date(value) : undefined;
        }
        return value;
      });
    }
    return [];
  });

  const [filters, setFilters] = useState<TodoFilters>({
    status: 'all',
    priority: 'all',
    category: 'all',
    search: '',
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoData: Omit<Todo, 'id' | 'completed' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filters.status !== 'all' && 
        ((filters.status === 'completed') !== todo.completed)) {
      return false;
    }
    if (filters.priority !== 'all' && filters.priority !== todo.priority) {
      return false;
    }
    if (filters.category !== 'all' && filters.category !== todo.category) {
      return false;
    }
    if (filters.search && !todo.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <ListTodo size={32} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Modern Todo List</h1>
        </div>

        <div className="grid gap-6">
          <TodoForm onAdd={addTodo} />

          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex gap-4 mb-4 text-sm">
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                Total: {stats.total}
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                Completed: {stats.completed}
              </div>
              <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                Active: {stats.active}
              </div>
            </div>
          </div>

          <TodoFiltersComponent
            filters={filters}
            onFilterChange={setFilters}
          />

          <div className="space-y-4">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No todos found. Add some tasks to get started!
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;