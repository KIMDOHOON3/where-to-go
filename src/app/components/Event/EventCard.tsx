import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import formatDate from '@/app/utils/formatDate';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';
import { useFavoriteStore } from '@/app/stores/useFavoriteStore';

interface EventCardProps {
  event: {
    contentid: string;
    firstimage?: string;
    title: string;
    addr1: string;
    eventstartdate: string;
    eventenddate: string;
  };
  onClick: () => void;
}

const EventCard = React.memo(({ event, onClick }: EventCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const isItemFavorite = isFavorite(event.contentid);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isItemFavorite) {
      removeFavorite(event.contentid);
    } else {
      addFavorite(event);
    }
  };

  return (
    <div className="event-card relative w-full rounded-md bg-white p-5" onClick={onClick}>
      <div className="2xl:flex">
        <div className="relative h-[12.5rem] w-full lg:h-72 2xl:w-[12.5rem]">
          <Image
            className="absolute h-full w-full rounded-lg object-contain 2xl:object-cover"
            src={event.firstimage || '/error/no-image.png'}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: 'contain',
              borderRadius: '0.5rem',
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
        <div className="border-dashed text-center 2xl:ml-8 2xl:flex 2xl:flex-col 2xl:justify-between 2xl:border-l 2xl:pb-0 2xl:pl-8 2xl:text-left">
          <div className="my-3">
            <h3 className="text-md lg:text-2xl">{filterTitle(event.title)}</h3>
            <p className="text-xs text-gray6 lg:text-base">{filterAddress(event.addr1)}</p>
          </div>
          <div className="border-b border-dashed pb-4 lg:mt-10 lg:flex lg:justify-around lg:gap-10 2xl:border-b-0">
            <div>
              <p className="hidden lg:block">기간</p>
              <div className="flex justify-center gap-3 lg:justify-start">
                <span className="text-xs text-gray6 2xl:text-sm">
                  {formatDate(event.eventstartdate)}
                </span>
                <span className="text-xs text-gray6 2xl:text-sm">~</span>
                <span className="text-xs text-gray6 2xl:text-sm">
                  {formatDate(event.eventenddate)}
                </span>
              </div>
            </div>
            <div>
              <p className="hidden lg:block">장소</p>
              <p className="hidden lg:block lg:text-xs 2xl:text-sm">{event.addr1}</p>
            </div>
          </div>
          <div className="mt-4 lg:mb-4 lg:mt-7">
            <Link
              className="hover-button rounded-xl border border-bordercolor px-6 py-1 text-sm lg:text-base"
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
      </div>
    </div>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;
