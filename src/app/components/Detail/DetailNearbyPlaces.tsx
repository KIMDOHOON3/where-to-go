'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useNearbyPlaces } from '@/app/hooks/useNearbyPlaces';

interface DetailNearbyPlacesProps {
  mapx?: string;
  mapy?: string;
}

const DetailNearbyPlaces = ({ mapx, mapy }: DetailNearbyPlacesProps) => {
  const staysQuery = useNearbyPlaces(mapx, mapy, '32', 4); // 숙박 (contentTypeId 32)
  const restaurantsQuery = useNearbyPlaces(mapx, mapy, '39', 4); // 음식점 (contentTypeId 39)

  const stayItems = staysQuery.data?.items || [];
  const restaurantItems = restaurantsQuery.data?.items || [];

  const isLoading = staysQuery.isLoading || restaurantsQuery.isLoading;
  const hasData = stayItems.length > 0 || restaurantItems.length > 0;

  if (isLoading) {
    return (
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-bold">주변 추천</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3 rounded-lg border border-gray-200 p-4">
              <div className="h-40 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!hasData) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-xl font-bold">주변 추천</h2>

      {/* 숙박 */}
      {stayItems.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <span>🏨</span> 숙박시설
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {stayItems.map((item) => (
              <Link
                key={item.contentid}
                href={`/detail/${item.contentid}?title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.firstimage || '')}`}
                className="block"
              >
                <div className="border-gray-200 overflow-hidden rounded-lg border transition-all hover:border-blue-500 hover:shadow-md">
                  {item.firstimage && (
                    <div className="bg-gray-200 relative h-32 w-full">
                      <Image
                        src={item.firstimage}
                        alt={item.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/error/no-image.png';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-gray-800 line-clamp-1 font-semibold">{item.title}</p>
                    <p className="text-gray-600 line-clamp-1 text-sm">{item.addr1}</p>
                    {item.tel && (
                      <p className="text-gray-500 mt-1 text-sm">
                        <a href={`tel:${item.tel}`} className="hover:text-blue-600">
                          {item.tel}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 음식점 */}
      {restaurantItems.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <span>🍽️</span> 음식점
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {restaurantItems.map((item) => (
              <Link
                key={item.contentid}
                href={`/detail/${item.contentid}?title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.firstimage || '')}`}
                className="block"
              >
                <div className="border-gray-200 overflow-hidden rounded-lg border transition-all hover:border-orange-500 hover:shadow-md">
                  {item.firstimage && (
                    <div className="bg-gray-200 relative h-32 w-full">
                      <Image
                        src={item.firstimage}
                        alt={item.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/error/no-image.png';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-gray-800 line-clamp-1 font-semibold">{item.title}</p>
                    <p className="text-gray-600 line-clamp-1 text-sm">{item.addr1}</p>
                    {item.tel && (
                      <p className="text-gray-500 mt-1 text-sm">
                        <a href={`tel:${item.tel}`} className="hover:text-orange-600">
                          {item.tel}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailNearbyPlaces;
