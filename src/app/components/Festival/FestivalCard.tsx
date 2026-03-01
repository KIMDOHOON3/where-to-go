'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import formatDate from '@/app/utils/formatDate';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';
import { useFavoriteStore } from '@/app/stores/useFavoriteStore';

interface FestivalCardProps {
  event: {
    contentid: string;
    firstimage?: string;
    firstimage2?: string;
    title: string;
    addr1: string;
    contenttypeid: string;
    eventstartdate: string;
    eventenddate: string;
    tel?: string;
  };
  onClick: () => void;
}

const FestivalCard = React.memo(({ event, onClick }: FestivalCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const isItemFavorite = isFavorite(event.contentid);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isItemFavorite) {
      removeFavorite(event.contentid);
    } else {
      addFavorite({
        ...event,
        firstimage: event.firstimage || '',
        firstimage2: event.firstimage2 || '',
        tel: event.tel || '',
      });
    }
  };

  return (
    <div
      className="festival-card group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg"
      onClick={onClick}
    >
      {/* 이미지 */}
      <div className="bg-gray-100 relative h-48 w-full overflow-hidden md:h-56">
        <Image
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={event.firstimage || '/error/no-image.png'}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            e.currentTarget.src = '/error/no-image.png';
          }}
        />

        {/* 하트 버튼 */}
        <button
          onClick={handleFavoriteClick}
          className="bg-white/80 absolute right-2 top-2 rounded-full p-2 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          aria-label={isItemFavorite ? '찜 해제' : '찜하기'}
        >
          <svg
            className="h-5 w-5"
            fill={isItemFavorite ? '#ef4444' : 'none'}
            stroke={isItemFavorite ? '#ef4444' : '#374151'}
            strokeWidth={2}
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

      {/* 정보 */}
      <div className="p-4 md:p-5">
        <h3 className="line-clamp-2 text-sm font-bold md:text-base">{filterTitle(event.title)}</h3>
        <p className="text-gray-600 mt-1 line-clamp-1 text-xs md:text-sm">
          {filterAddress(event.addr1)}
        </p>

        {/* 기간 */}
        <div className="text-gray-500 mt-3 flex flex-wrap gap-2 text-xs md:text-sm">
          <span>{formatDate(event.eventstartdate)}</span>
          <span>~</span>
          <span>{formatDate(event.eventenddate)}</span>
        </div>

        {/* 길찾기 버튼 */}
        <Link
          className="hover-button hover:bg-gray-50 mt-4 inline-block rounded-lg border border-bordercolor px-4 py-2 text-xs transition-all md:text-sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
          href={createKakaoMapURL(event.addr1)}
          target="_blank"
          aria-label={`${filterTitle(event.title)} 위치 카카오맵에서 길찾기`}
        >
          길찾기
        </Link>
      </div>
    </div>
  );
});

FestivalCard.displayName = 'FestivalCard';

export default FestivalCard;
