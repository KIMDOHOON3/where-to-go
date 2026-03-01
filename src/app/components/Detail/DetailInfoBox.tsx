'use client';

import Link from 'next/link';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';

interface DetailInfoBoxProps {
  address: string;
  phone?: string;
  homepage?: string;
  overview?: string;
}

const DetailInfoBox = ({ address, phone, homepage, overview }: DetailInfoBoxProps) => {
  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
  };

  return (
    <>
      {/* 기본 정보 */}
      <div className="bg-gray-50 mb-6 rounded-lg p-6">
        <div className="grid gap-4">
          {address && (
            <div className="flex items-start gap-3">
              <svg
                className="text-gray-600 mt-1 h-5 w-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="flex-1">
                <p className="text-gray-700 mb-2 font-medium">{address}</p>
                <Link
                  href={createKakaoMapURL(address)}
                  target="_blank"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  카카오맵에서 보기 →
                </Link>
              </div>
            </div>
          )}

          {phone && (
            <div className="flex items-center gap-3">
              <svg
                className="text-gray-600 h-5 w-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a href={`tel:${phone}`} className="text-gray-700 font-medium hover:text-blue-600">
                {phone}
              </a>
            </div>
          )}

          {homepage && (
            <div className="flex items-center gap-3">
              <svg
                className="text-gray-600 h-5 w-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <div
                className="text-gray-700 text-sm"
                dangerouslySetInnerHTML={{ __html: homepage }}
              />
            </div>
          )}
        </div>
      </div>

      {/* 개요 */}
      {overview && (
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-bold">소개</h2>
          <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed md:text-base">
            {stripHtml(overview)}
          </p>
        </div>
      )}
    </>
  );
};

export default DetailInfoBox;
