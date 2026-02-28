'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { useFavoriteStore } from '@/app/stores/useFavoriteStore';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';

interface ItemTypes {
  item: {
    firstimage: string;
    firstimage2: string;
    title: string;
    contentid: string;
    contenttypeid: string;
    addr1?: string;
    tel?: string;
  };
}

const AreaSlideProps = React.memo(({ item }: ItemTypes) => {
  const router = useRouter();
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const isItemFavorite = isFavorite(item.contentid);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isItemFavorite) {
      removeFavorite(item.contentid);
    } else {
      addFavorite({
        ...item,
        addr1: item.addr1 || '',
        tel: item.tel || '',
      });
    }
  };
  return (
    <>
      <div
        className="relative aspect-[4/3] h-[34.38vw] w-full cursor-pointer overflow-hidden rounded-md lg:aspect-square lg:h-full"
        onClick={() =>
          router.push(
            `/detail/${item.contentid}?contentTypeId=${item.contenttypeid}&title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.firstimage || '')}`
          )
        }
      >
        <Image
          className="object-cover"
          src={item.firstimage || '/error/no-image.png'}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
          }}
        />
        {/* 하트 버튼 */}
        <button
          onClick={handleFavoriteClick}
          className="bg-white/80 absolute right-2 top-2 rounded-full p-2 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
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
        <p className="mt-2 text-center text-[0.8125rem] font-bold lg:text-lg">
          {filterTitle(item.title)}
        </p>
        <div className="pb-2 md:flex md:items-center md:justify-center md:gap-2 lg:pb-3">
          <p className="text-center text-[0.6875rem] text-black lg:text-[0.9375rem]">
            {filterAddress(item.addr1 || '주소를 준비중입니다.')}
          </p>
          <div className="flex justify-center">
            <Link
              className="hover-button relative inline-block h-[1.875rem] w-[1.875rem] rounded-full border border-bordercolor text-sm lg:text-base"
              href={createKakaoMapURL(item.addr1 || '주소를 준비중입니다.')}
              target="_blank"
              onClick={(e) => {
                e.stopPropagation();
              }}
              aria-label={`${filterTitle(item.title)} 위치 카카오맵에서 보기`}
            >
              <FontAwesomeIcon
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                icon={faMapLocationDot}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});

AreaSlideProps.displayName = 'AreaSlideProps';

export default AreaSlideProps;
