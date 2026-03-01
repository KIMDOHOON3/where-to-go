'use client';

import { FESTIVAL_CATEGORIES } from '@/app/constant/festivalConstants';

interface FestivalCategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FestivalCategoryTabs({
  selectedCategory,
  onCategoryChange,
}: FestivalCategoryTabsProps) {
  return (
    <div className="border-gray-200 flex gap-2 overflow-x-auto border-b px-1 py-3 md:justify-center md:gap-4 md:px-0">
      {FESTIVAL_CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-all md:px-5 md:py-3 md:text-base ${
            selectedCategory === category.id
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.emoji} {category.name}
        </button>
      ))}
    </div>
  );
}
