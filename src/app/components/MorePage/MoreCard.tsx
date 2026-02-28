import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AreaItem } from '@/app/types/ItemType';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';
import { useFavoriteStore } from '@/app/stores/useFavoriteStore';

interface MoreCardProps {
  moreData: AreaItem[];
  onClick: () => void;
}

const MoreCard = React.memo(({ moreData, onClick }: MoreCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

  return (
    <>
      <div className="grid w-full grid-cols-2 gap-3 px-4 py-4 lg:grid-cols-4 lg:gap-5 lg:px-6 lg:pt-12 1xl:m-auto 1xl:max-w-[62.5rem]">
        {moreData.map((more) => {
          const isItemFavorite = isFavorite(more.contentid);

          const handleFavoriteClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (isItemFavorite) {
              removeFavorite(more.contentid);
            } else {
              addFavorite(more);
            }
          };

          return (
            <div
              key={more.contentid}
              className="flex w-full cursor-pointer flex-col"
              onClick={onClick}
            >
              <div className="relative mb-2 aspect-[4/3] h-[34.38vw] w-full lg:h-[13.75rem]">
                <Image
                  className="rounded-lg object-cover"
                  src={more.firstimage || '/error/no-image.png'}
                  alt={more.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
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
                    className="h-4 w-4 lg:h-5 lg:w-5"
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
              <div className="shadow-lg">
                <div className="text-center">
                  <h1 className="text-base font-bold lg:text-lg">{filterTitle(more.title)}</h1>
                  <p className="text-xs lg:text-sm">
                    {filterAddress(more.addr1 || '주소를 준비중입니다.')}
                  </p>
                  <div className="mb-2 mt-2 lg:mb-4 lg:mt-7">
                    <Link
                      className="hover-button rounded-xl border border-bordercolor px-6 py-1 text-sm lg:text-base"
                      href={createKakaoMapURL(more.addr1 || '주소를 준비중입니다.')}
                      target="_blank"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      aria-label={`${filterTitle(more.title)} 위치 카카오맵에서 길찾기`}
                    >
                      길찾기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
});

MoreCard.displayName = 'MoreCard';

export default MoreCard;
