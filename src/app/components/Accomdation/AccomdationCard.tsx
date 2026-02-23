import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';
import { StayItem } from '@/app/types/ItemType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';

interface AccomdationCardProps {
  stay: StayItem;
  onClick: () => void;
}

const AccomdationCard = React.memo(({ stay, onClick }: AccomdationCardProps) => {
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
