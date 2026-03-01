'use client';

import Link from 'next/link';

interface TravelTypeCardProps {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  hoverColor: string;
}

const TravelTypeCard = ({
  id,
  title,
  icon,
  description,
  color,
  hoverColor,
}: TravelTypeCardProps) => {
  return (
    <Link href={`/course/${id}`}>
      <div
        className={`${color} ${hoverColor} flex flex-col items-center justify-center rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer min-h-[180px]`}
      >
        <span className="text-5xl mb-3">{icon}</span>
        <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 text-center">{description}</p>
      </div>
    </Link>
  );
};

export default TravelTypeCard;
