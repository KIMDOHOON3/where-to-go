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
            href="/course/all"
            className={`nav-affter relative block w-full py-[0.625rem] text-[0.875rem] lg:text-[1.25rem] ${
              pathname === '/course/all' ? 'on' : ''
            }`}
          >
            코스
          </Link>
        </li>
        <li className="hidden text-center lg:block lg:w-auto">
          <Link
            href="/theme"
            className={`nav-affter relative block w-full py-[0.625rem] text-[0.875rem] lg:text-[1.25rem] ${
              pathname === '/theme' ? 'on' : ''
            }`}
          >
            테마
          </Link>
        </li>
        <li className="hidden text-center lg:block lg:w-auto">
          <Link
            href="/festival"
            className={`nav-affter relative block w-full py-[0.625rem] text-[0.875rem] lg:text-[1.25rem] ${
              pathname === '/festival' ? 'on' : ''
            }`}
          >
            축제
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
