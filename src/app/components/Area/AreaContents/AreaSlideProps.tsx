import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import useLike from '@/app/hooks/useLike';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';

interface ItemTypes {
  item: {
    firstimage: string;
    title: string;
    contentid: string;
    addr1?: string;
  };
  onClick: () => void;
}

const AreaSlideProps = React.memo(({ item, onClick }: ItemTypes) => {
  const { heartStates, toggleHeart } = useLike();
  return (
    <>
      <div
        className="relative aspect-[4/3] h-[34.38vw] w-full cursor-pointer overflow-hidden rounded-md lg:aspect-square lg:h-full"
        onClick={onClick}
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
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleHeart(item.contentid);
          }}
          className="absolute right-2 top-2 h-5 w-5 cursor-pointer rounded-full bg-white lg:h-7 lg:w-7"
        >
          <FontAwesomeIcon
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm ${heartStates[item.contentid] ? 'text-[#ff6b6b]' : 'text-black opacity-[50%]'} transition-transform duration-300 hover:text-[#ff6b6b] lg:text-lg`}
            icon={faHeart}
          />
        </div>
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
