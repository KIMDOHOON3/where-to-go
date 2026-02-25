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
  metadataBase: new URL('https://koreantrip.vercel.app'),
  title: {
    default: '여행 어디가? - 국내 여행 정보 플랫폼',
    template: '%s | 여행 어디가?',
  },
  description: '전국 숙박, 맛집, 관광지, 여행지, 행사 정보를 제공하는 국내 여행 정보 서비스입니다.',
  keywords: [
    '여행 어디가?',
    '국내 여행',
    '관광 정보',
    '여행지 추천',
    '숙박',
    '맛집',
    '관광지',
    '행사 정보',
    '한국 여행',
  ],
  authors: [{ name: '여행 어디가?' }],
  creator: '여행 어디가?',
  publisher: '여행 어디가?',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    siteName: '여행 어디가?',
    title: '여행 어디가? - 국내 여행 정보 플랫폼',
    type: 'website',
    description:
      '전국 숙박, 맛집, 관광지, 여행지, 행사 정보를 제공하는 국내 여행 정보 서비스입니다.',
    images: [
      {
        url: '/meta/sum-meta-img.png',
        width: 1200,
        height: 630,
        alt: '여행 어디가? 대표 이미지',
      },
    ],
    url: '/',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '여행 어디가? - 국내 여행 정보 플랫폼',
    description:
      '전국 숙박, 맛집, 관광지, 여행지, 행사 정보를 제공하는 국내 여행 정보 서비스입니다.',
    images: ['/meta/sum-meta-img.png'],
    creator: '@koreantrip',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  verification: {
    google: 'google-site-verification-code', // Google Search Console에서 발급받은 코드로 교체
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
