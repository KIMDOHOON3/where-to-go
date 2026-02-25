import type { Metadata } from 'next';
import '@/app/styles/globals.css';
import 'swiper/css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/FooterContents';
import Providers from '@/app/providers/providers';
config.autoAddCss = false;

export const metadata: Metadata = {
  title: '여행 어디가?',
  description: '전국 숙박, 맛집, 관광지, 여행지, 행사 정보를 제공하는 국내 여행 정보 서비스입니다.',
  keywords: '여행 어디가?, 국내 여행, 관광 정보, 여행 플랫폼, 웹 개발',
  openGraph: {
    siteName: '여행 어디가?',
    title: '여행 어디가?',
    type: 'website',
    description:
      '전국 숙박, 맛집, 관광지, 여행지, 행사 정보를 제공하는 국내 여행 정보 서비스입니다.',
    images: [
      {
        url: 'https://koreantrip.vercel.app/meta/sum-meta-img.png',
        alt: '여행 어디가? 이미지',
      },
    ],
    url: 'https://koreantrip.vercel.app/',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/fonts-archive/Pretendard/subsets/Pretendard-dynamic-subset.css"
        />
      </head>
      <body>
        <Providers>
          <Header />
          <div className="flex min-h-screen flex-col">
            <main className="mb-16 mt-[8.75rem] flex-1 lg:mb-0 lg:mt-0">{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
