import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Vercel 무료 플랜 이미지 최적화 제한 회피
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tong.visitkorea.or.kr',
      },
    ],
  },
};

export default nextConfig;
