'use client';

import Link from 'next/link';
import { THEMES, THEME_CATEGORIES } from '@/app/constant/themeConstants';
import Image from 'next/image';

const ThemeCategorySection = () => {
  const feelingThemes = THEMES.filter((t) => t.category === 'feeling');
  const seasonThemes = THEMES.filter((t) => t.category === 'season');
  const specialThemes = THEMES.filter((t) => t.category === 'special');

  const renderThemeGrid = (themes: typeof THEMES) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {themes.map((theme) => (
        <Link key={theme.id} href={`/theme/${theme.id}`}>
          <div
            className={`group relative h-48 cursor-pointer overflow-hidden rounded-2xl ${theme.bgColor} transition-all hover:shadow-lg`}
          >
            {/* 배경 이미지 */}
            <div className="absolute inset-0 opacity-20 transition-transform group-hover:scale-110">
              <Image src={theme.image} alt={theme.name} fill className="object-cover" />
            </div>

            {/* 그라데이션 오버레이 */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-70`} />

            {/* 콘텐츠 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
              <span className="mb-2 block text-5xl">{theme.emoji}</span>
              <h3 className="mb-1 text-xl font-bold">{theme.name}</h3>
              <p className="text-white/90 line-clamp-2 text-sm">{theme.description}</p>
            </div>

            {/* 호버 효과 */}
            <div className="bg-black/0 group-hover:bg-black/10 absolute inset-0 transition-all" />
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="space-y-16 bg-white px-4 py-12 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-16">
        {/* 감성 테마 */}
        <section>
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-3xl">{THEME_CATEGORIES.feeling.emoji}</span>
              <h2 className="text-gray-900 text-2xl font-bold md:text-3xl">
                {THEME_CATEGORIES.feeling.name}
              </h2>
            </div>
            <p className="text-gray-600">{THEME_CATEGORIES.feeling.description}</p>
          </div>
          {renderThemeGrid(feelingThemes)}
        </section>

        {/* 계절 테마 */}
        <section className="border-gray-200 border-t pt-12">
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-3xl">{THEME_CATEGORIES.season.emoji}</span>
              <h2 className="text-gray-900 text-2xl font-bold md:text-3xl">
                {THEME_CATEGORIES.season.name}
              </h2>
            </div>
            <p className="text-gray-600">{THEME_CATEGORIES.season.description}</p>
          </div>
          {renderThemeGrid(seasonThemes)}
        </section>

        {/* 특색 테마 */}
        <section className="border-gray-200 border-t pt-12">
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-3xl">{THEME_CATEGORIES.special.emoji}</span>
              <h2 className="text-gray-900 text-2xl font-bold md:text-3xl">
                {THEME_CATEGORIES.special.name}
              </h2>
            </div>
            <p className="text-gray-600">{THEME_CATEGORIES.special.description}</p>
          </div>
          {renderThemeGrid(specialThemes)}
        </section>
      </div>
    </div>
  );
};

export default ThemeCategorySection;
