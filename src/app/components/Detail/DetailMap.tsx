'use client';

interface DetailMapProps {
  title: string;
  mapx?: string;
  mapy?: string;
}

const DetailMap = ({ title, mapx, mapy }: DetailMapProps) => {
  if (!mapx || !mapy) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-xl font-bold">🗺️ 위치</h2>
      <div className="bg-gray-200 h-96 w-full overflow-hidden rounded-lg">
        <iframe
          width="100%"
          height="100%"
          src={`https://map.kakao.com/link/map/${encodeURIComponent(title)},${mapy},${mapx}`}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title={`${title} 카카오맵`}
        ></iframe>
      </div>
    </div>
  );
};

export default DetailMap;
