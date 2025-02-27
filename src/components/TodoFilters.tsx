import { Filter, Search } from 'lucide-react';
import { TodoFilters } from '../types/todo';

interface TodoFiltersProps {
  filters: TodoFilters;
  onFilterChange: (filters: TodoFilters) => void;
}

export default function TodoFiltersComponent({ filters, onFilterChange }: TodoFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="flex items-center gap-2 text-gray-700">
        <Filter size={20} />
        <h2 className="font-medium">Filters</h2>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value as TodoFilters['status'] })}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => onFilterChange({ ...filters, priority: e.target.value as TodoFilters['priority'] })}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value as TodoFilters['category'] })}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
        </select>
      </div>
    </div>
  );
}