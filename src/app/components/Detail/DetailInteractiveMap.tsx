'use client';

import { useEffect, useRef, useState } from 'react';
import { useNearbyPlaces } from '@/app/hooks/useNearbyPlaces';

interface DetailInteractiveMapProps {
  title: string;
  mapx?: string;
  mapy?: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const DetailInteractiveMap = ({ title, mapx, mapy }: DetailInteractiveMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const staysQuery = useNearbyPlaces(mapx, mapy, '32', 5);
  const restaurantsQuery = useNearbyPlaces(mapx, mapy, '39', 5);

  // Kakao Maps SDK 로드
  useEffect(() => {
    if (typeof window !== 'undefined' && window.kakao) {
      setMapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services`;
    script.async = true;
    script.onload = () => {
      setMapLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  // 맵 초기화 및 마커 표시
  useEffect(() => {
    if (!mapLoaded || !containerRef.current || !mapx || !mapy) return;

    const kakao = window.kakao;
    if (!kakao?.maps) return;

    const lat = parseFloat(mapy);
    const lng = parseFloat(mapx);

    // 맵 생성
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 5,
    };

    const map = new kakao.maps.Map(containerRef.current, options);
    mapRef.current = map;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 주요 위치 마커 (빨강)
    const mainMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
      map,
      image: new kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerShadow.png',
        new kakao.maps.Size(35, 45),
        { offset: new kakao.maps.Point(15, 43) }
      ),
      title,
    });

    // 마커 정보창
    const mainInfowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:12px;font-weight:bold;">${title}</div>`,
    });

    mainMarker.addListener('mouseover', () => {
      mainInfowindow.open(map, mainMarker);
    });
    mainMarker.addListener('mouseout', () => {
      mainInfowindow.close();
    });

    markersRef.current.push(mainMarker);

    // 숙박 마커 (파랑)
    const stayMarkerImage = new kakao.maps.MarkerImage(
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue.png',
      new kakao.maps.Size(35, 45),
      { offset: new kakao.maps.Point(12, 45) }
    );

    staysQuery.data?.items.forEach((stay) => {
      if (stay.mapx && stay.mapy) {
        const stayMarker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(parseFloat(stay.mapy), parseFloat(stay.mapx)),
          map,
          image: stayMarkerImage,
          title: `[숙박] ${stay.title}`,
        });

        const stayInfowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">🏨 ${stay.title}</div>`,
        });

        stayMarker.addListener('mouseover', () => {
          stayInfowindow.open(map, stayMarker);
        });
        stayMarker.addListener('mouseout', () => {
          stayInfowindow.close();
        });

        markersRef.current.push(stayMarker);
      }
    });

    // 음식점 마커 (노랑)
    const restaurantMarkerImage = new kakao.maps.MarkerImage(
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/yellow.png',
      new kakao.maps.Size(35, 45),
      { offset: new kakao.maps.Point(12, 45) }
    );

    restaurantsQuery.data?.items.forEach((restaurant) => {
      if (restaurant.mapx && restaurant.mapy) {
        const restaurantMarker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(parseFloat(restaurant.mapy), parseFloat(restaurant.mapx)),
          map,
          image: restaurantMarkerImage,
          title: `[음식점] ${restaurant.title}`,
        });

        const restaurantInfowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">🍽️ ${restaurant.title}</div>`,
        });

        restaurantMarker.addListener('mouseover', () => {
          restaurantInfowindow.open(map, restaurantMarker);
        });
        restaurantMarker.addListener('mouseout', () => {
          restaurantInfowindow.close();
        });

        markersRef.current.push(restaurantMarker);
      }
    });

    // 모든 마커가 보이도록 줌 조정
    if (markersRef.current.length > 1) {
      const bounds = new kakao.maps.LatLngBounds();
      markersRef.current.forEach((marker) => {
        bounds.extend(marker.getPosition());
      });
      map.setBounds(bounds, 50, 50, 50, 50);
    }
  }, [mapLoaded, mapx, mapy, staysQuery.data, restaurantsQuery.data, title]);

  if (!mapx || !mapy) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-xl font-bold">🗺️ 지역 맵</h2>
      <div
        ref={containerRef}
        className="border-gray-200 bg-gray-100 h-96 w-full overflow-hidden rounded-lg border"
      />
      <div className="mt-3 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="bg-red-500 h-4 w-4 rounded-full" />
          <span>현재 위치</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-blue-500" />
          <span>숙박시설</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-yellow-500" />
          <span>음식점</span>
        </div>
      </div>
    </div>
  );
};

export default DetailInteractiveMap;
