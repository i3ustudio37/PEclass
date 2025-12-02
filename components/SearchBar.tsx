import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="請輸入學號查詢 (例如: B1234567)"
          className="w-full px-5 py-3 pr-12 text-lg border-2 border-primary/20 rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
        />
        <button
          onClick={onSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full hover:bg-secondary transition-colors"
          aria-label="搜尋"
        >
          <Search size={20} />
        </button>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2">
        請輸入完整學號以取得詳細成績
      </p>
    </div>
  );
};