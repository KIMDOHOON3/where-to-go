import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { AreaItem } from '@/app/types/ItemType';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';
import useLike from '@/app/hooks/useLike';

interface MoreCardProps {
  moreData: AreaItem[];
  onClick: () => void;
}

const MoreCard = React.memo(({ moreData, onClick }: MoreCardProps) => {
  const { heartStates, toggleHeart } = useLike();
  return (
    <>
      <div className="grid w-full grid-cols-2 gap-3 px-4 py-4 lg:grid-cols-4 lg:gap-5 lg:px-6 lg:pt-12 1xl:m-auto 1xl:max-w-[62.5rem]">
        {moreData.map((more) => (
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
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleHeart(more.contentid);
                }}
                className="absolute right-2 top-2 h-5 w-5 cursor-pointer rounded-full bg-white lg:h-7 lg:w-7"
              >
                <FontAwesomeIcon
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm ${heartStates[more.contentid] ? 'text-[#ff6b6b]' : 'text-black opacity-[50%]'} transition-transform duration-300 hover:text-[#ff6b6b] lg:text-lg`}
                  icon={faHeart}
                />
              </div>
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
        ))}
      </div>
    </>
  );
});

MoreCard.displayName = 'MoreCard';

export default MoreCard;
