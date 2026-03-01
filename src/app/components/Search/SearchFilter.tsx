'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchFilterProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  keyword: string;
  travelType: string;
  region: string;
}

const regions = [
  { value: '', label: '전국' },
  { value: '서울', label: '서울' },
  { value: '인천', label: '인천' },
  { value: '부산', label: '부산' },
  { value: '대구', label: '대구' },
  { value: '대전', label: '대전' },
  { value: '광주', label: '광주' },
  { value: '울산', label: '울산' },
  { value: '세종', label: '세종' },
  { value: '제주', label: '제주' },
  { value: '경기', label: '경기' },
  { value: '강원', label: '강원' },
];

const travelTypes = [
  { value: '', label: '모든 타입' },
  { value: 'family', label: '👨‍👩‍👧‍👦 가족여행' },
  { value: 'friends', label: '👫 친구여행' },
  { value: 'couple', label: '💑 연인여행' },
  { value: 'solo', label: '🚶 혼자여행' },
  { value: 'foreigner', label: '🌏 외국인코스' },
  { value: 'pet', label: '🐕 반려견동반' },
];

const SearchFilter = ({ onFilterChange }: SearchFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    travelType: '',
    region: '',
  });
  const router = useRouter();

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, keyword: e.target.value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleTravelTypeChange = (value: string) => {
    const newFilters = { ...filters, travelType: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleRegionChange = (value: string) => {
    const newFilters = { ...filters, region: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSearch = () => {
    if (filters.keyword) {
      router.push(`/searchpage?keyword=${encodeURIComponent(filters.keyword)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="border-gray-200 border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 lg:px-16">
        {/* 검색바 */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="원하는 여행지를 검색해보세요"
            value={filters.keyword}
            onChange={handleKeywordChange}
            onKeyPress={handleKeyPress}
            className="border-gray-300 flex-1 rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            검색
          </button>
        </div>

        {/* 필터 탭 */}
        <div className="flex flex-col gap-3">
          {/* 여행 타입 필터 */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-semibold">여행 타입</label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {travelTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleTravelTypeChange(type.value)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 font-medium transition-colors ${
                    filters.travelType === type.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* 지역 필터 */}
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-semibold">지역</label>
            <select
              value={filters.region}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="border-gray-300 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {regions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
