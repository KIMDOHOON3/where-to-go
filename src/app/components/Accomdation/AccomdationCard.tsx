import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';
import { StayItem } from '@/app/types/ItemType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';
import { useFavoriteStore } from '@/app/stores/useFavoriteStore';

interface AccomdationCardProps {
  stay: StayItem;
  onClick: () => void;
}

const AccomdationCard = React.memo(({ stay, onClick }: AccomdationCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const isItemFavorite = isFavorite(stay.contentid);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isItemFavorite) {
      removeFavorite(stay.contentid);
    } else {
      addFavorite(stay);
    }
  };

  return (
    <div className="rounded-lg bg-white shadow-md" onClick={onClick}>
      <div className="relative aspect-[4/3]">
        <Image
          className="h-full w-full rounded-t-lg"
          src={stay.firstimage || '/error/no-image.png'}
          alt={stay.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
          }}
          loading="lazy"
        />
        {/* 하트 버튼 */}
        <button
          onClick={handleFavoriteClick}
          className="absolute right-2 top-2 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
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
      <div className="p-4">
        <h2 className="text-primary mb-2 text-lg font-bold">{filterTitle(stay.title)}</h2>
        <div className="flex items-center gap-2 lg:justify-between lg:gap-0">
          <p className="text-gray-600 text-sm">
            {filterAddress(stay.addr1 || '주소를 준비중입니다.')}
          </p>
          <Link
            className="hover-button relative inline-block h-[1.875rem] w-[1.875rem] rounded-full border border-bordercolor text-sm lg:text-base"
            href={createKakaoMapURL(stay.addr1)}
            target="_blank"
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-label={`${filterTitle(stay.title)} 위치 카카오맵에서 보기`}
          >
            <FontAwesomeIcon
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              icon={faMapLocationDot}
            />
          </Link>
        </div>
      </div>
    </div>
  );
});

AccomdationCard.displayName = 'AccomdationCard';

export default AccomdationCard;
