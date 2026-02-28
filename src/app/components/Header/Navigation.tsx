import { usePathname } from 'next/navigation';
import Link from 'next/link';
export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex items-center justify-between lg:w-full lg:gap-[3.125rem]">
        <li className="w-[25%] text-center lg:w-auto">
          <Link
            href="/"
            className={`nav-affter relative block w-full py-[0.625rem] text-[0.875rem] lg:text-[1.25rem] ${
              pathname === '/' ? 'on' : ''
            }`}
          >
            홈
          </Link>
        </li>
        <li className="w-[25%] text-center lg:w-auto">
          <Link
            href="/area"
            className={`nav-affter relative block w-full py-[0.625rem] text-[0.875rem] lg:text-[1.25rem] ${
              pathname === '/area' ? 'on' : ''
            }`}
          >
            지역
          </Link>
        </li>
        <li className="w-[25%] text-center lg:w-auto">
          <Link
            href="/morepage"
            className={`nav-affter relative block w-full py-[0.625rem] text-[0.875rem] lg:text-[1.25rem] ${
              pathname === '/morepage' ? 'on' : ''
            }`}
          >
            더보기
          </Link>
        </li>
        <li className="w-[25%] text-center lg:w-auto">
          <Link
            href="/favorites"
            className={`nav-affter relative block w-full py-[0.625rem] text-[0.875rem] lg:text-[1.25rem] ${
              pathname === '/favorites' ? 'on' : ''
            }`}
          >
            찜
          </Link>
        </li>
      </ul>
    </nav>
  );
}
