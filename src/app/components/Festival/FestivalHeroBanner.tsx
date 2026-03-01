'use client';

import Image from 'next/image';

interface FestivalHeroBannerProps {
  event?: {
    title: string;
    firstimage?: string;
    addr1: string;
  };
}

export default function FestivalHeroBanner({ event }: FestivalHeroBannerProps) {
  const title = event?.title || '행사·축제';
  const image = event?.firstimage || '/error/no-image.png';
  const location = event?.addr1 || '전국';

  return (
    <div className="from-black/30 to-black/60 relative h-[250px] w-full overflow-hidden rounded-lg bg-gradient-to-b md:h-[350px] lg:h-[400px]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
        onError={(e) => {
          e.currentTarget.src = '/error/no-image.png';
        }}
      />
      <div className="bg-black/40 absolute inset-0" />

      {/* 컨텐츠 */}
      <div className="relative flex h-full flex-col justify-end p-4 md:p-8 lg:p-12">
        <h1 className="text-xl font-bold text-white md:text-3xl lg:text-4xl">{title}</h1>
        <p className="text-gray-200 mt-2 text-sm md:mt-3 md:text-base">{location}</p>
      </div>
    </div>
  );
}
