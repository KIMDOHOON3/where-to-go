'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { AreaHeaderSlide, categories } from '@/app/constant/SlideConstant';
import { useUIStore } from '@/app/stores/useAreaUiStore';
import { useInteractionStore } from '@/app/stores/useInteractionStore';

export default function MoreHeader() {
  const { selectedArea, setSelectedArea, setActiveIndex } = useUIStore();
  const { category, setCategory } = useInteractionStore();

  const handleCategoryClick = useCallback((newCategory: string) => {
    setCategory(newCategory);
  }, [setCategory]);

  const handleSlideClick = useCallback((index: number) => {
    const slide = AreaHeaderSlide[index];
    if (!slide) return;
    setActiveIndex(index);
    setSelectedArea(slide.title);
  }, [setActiveIndex, setSelectedArea]);

  // category에 따른 인덱스 계산
  const categoryIndex = categories.indexOf(category);

  return (
    <div className="bg-morebg lg:pt-28">
      <div className="1xl:m-auto 1xl:max-w-[62.5rem]">
        <div className="px-4 pt-7 lg:mx-auto lg:w-[37.5rem]">
          <ul className="relative flex justify-center overflow-hidden rounded-md border border-[#000] bg-[#fff]">
            <li
              className="more-header-slider"
              style={{ transform: `translateX(${categoryIndex * 100}%)` }}
            ></li>
            {categories.map((cat) => (
              <li
                key={cat}
                className={`more-header w-1/3 cursor-pointer py-1 text-center text-sm transition-all lg:py-2 lg:text-lg ${
                  category === cat ? 'selected text-[#fff]' : 'text-[#000]'
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="py-7">
          <div className="scroll-container px-4 pt-1 lg:pl-6 lg:pr-0">
            <div className="grid grid-cols-[repeat(9,_minmax(52px,_1fr))] grid-rows-2 gap-4">
              {AreaHeaderSlide.map((slide, index) => (
                <div
                  key={index}
                  className={`flex cursor-pointer flex-col items-center justify-center transition-all lg:w-[3.875rem] ${
                    slide.title === selectedArea ? 'scale-105' : 'opacity-80'
                  }`}
                  onClick={() => handleSlideClick(index)}
                >
                  <Image
                    className={`rounded-full border-2 object-cover ${
                      slide.title === selectedArea ? 'border-black' : 'border-transparent'
                    }`}
                    src={slide.image}
                    alt={slide.title}
                    width={52}
                    height={52}
                    style={{
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '1 / 1',
                    }}
                  />
                  <p
                    className={`mt-2 text-center text-[0.75rem] md:text-base ${
                      slide.title === selectedArea
                        ? 'text-[0.8125rem] font-semibold lg:text-[1.25rem]'
                        : 'font-normal lg:text-[1.0625rem]'
                    }`}
                  >
                    {slide.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
