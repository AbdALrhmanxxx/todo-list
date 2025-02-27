import { CheckCircle2, Circle, Trash2, Clock, Tag } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const categoryColors = {
    personal: 'bg-purple-100 text-purple-800',
    work: 'bg-blue-100 text-blue-800',
    shopping: 'bg-pink-100 text-pink-800',
    health: 'bg-teal-100 text-teal-800',
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${
      todo.completed ? 'border-gray-300' : 'border-blue-500'
    } hover:shadow-md transition-shadow`}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(todo.id)}
          className="mt-1 text-gray-500 hover:text-blue-600 transition-colors"
        >
          {todo.completed ? (
            <CheckCircle2 className="text-green-500" size={20} />
          ) : (
            <Circle size={20} />
          )}
        </button>

        <div className="flex-1">
          <h3 className={`text-lg font-medium ${
            todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
          }`}>
            {todo.title}
          </h3>
          
          {todo.description && (
            <p className="mt-1 text-gray-600">{todo.description}</p>
          )}

          <div className="mt-2 flex flex-wrap gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>

            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[todo.category]}`}>
              <Tag size={12} className="inline mr-1" />
              {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
            </span>

            {todo.dueDate && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <Clock size={12} className="inline mr-1" />
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-400 hover:text-red-600 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}