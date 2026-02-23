'use client';

import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5분
            gcTime: 1000 * 60 * 30, // 30분
            retry: 1, // 실패 시 1회만 재시도
            refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
            refetchOnReconnect: true, // 재연결 시에는 refetch
          },
        },
      })
  );
  const [, setTheme] = useState<string>('');

  // 클라이언트 사이드에서만 테마 정보 로드
  useEffect(() => {
    try {
      const storedTheme = sessionStorage?.getItem('theme');
      setTheme(storedTheme || '');

      // HTML 요소의 클래스 설정
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('테마 설정 중 오류 발생:', error);
    }
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
