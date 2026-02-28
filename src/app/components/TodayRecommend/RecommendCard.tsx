'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SearchApiResponse } from '@/app/types/ItemType';
import { useFavoriteStore } from '@/app/stores/useFavoriteStore';

interface RecommendCardProps {
  item: SearchApiResponse;
}

const RecommendCard = ({ item }: RecommendCardProps) => {
  const router = useRouter();
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const isItemFavorite = isFavorite(item.contentid);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isItemFavorite) {
      removeFavorite(item.contentid);
    } else {
      addFavorite(item);
    }
  };

  const handleCardClick = () => {
    router.push(
      `/detail/${item.contentid}?contentTypeId=${item.contenttypeid}&title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.firstimage || '')}`
    );
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
    >
      <div className="relative h-40 w-48 overflow-hidden rounded-lg md:h-48 md:w-56">
        <Image
          src={item.firstimage || '/error/no-image.png'}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 192px, 224px"
        />
        {/* 하트 버튼 */}
        <button
          onClick={handleFavoriteClick}
          className="bg-white/80 absolute right-2 top-2 rounded-full p-2 shadow-md transition-all hover:scale-110 hover:bg-white"
          aria-label={isItemFavorite ? '찜 해제' : '찜하기'}
        >
          <svg
            className="h-5 w-5"
            fill={isItemFavorite ? '#ef4444' : 'none'}
            stroke={isItemFavorite ? '#ef4444' : '#374151'}
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="mt-2 px-1">
        <h3 className="truncate text-sm font-semibold md:text-base">{item.title}</h3>
        <p className="text-gray-600 truncate text-xs md:text-sm">{item.addr1}</p>
      </div>
    </div>
  );
};

export default RecommendCard;
