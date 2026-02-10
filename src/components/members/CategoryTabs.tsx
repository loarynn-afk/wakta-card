'use client';

import { categories } from '@/data/categories';

interface CategoryTabsProps {
  current: string;
  onChange: (id: string) => void;
}

export default function CategoryTabs({ current, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2.5 absolute bottom-[-28px] left-5 z-[1] flex-wrap
      max-md:left-[15px] max-md:gap-2 max-md:bottom-[-24px]
      max-[480px]:left-2.5 max-[480px]:gap-1.5 max-[480px]:bottom-[-22px]">
      {categories.map((cat) => {
        const isActive = cat.id === current;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`
              flex items-center justify-center text-center font-bold cursor-pointer
              transition-all duration-200 ease-in-out rounded-md
              w-[85px] h-[55px] text-[0.73rem] px-2
              max-md:w-[72px] max-md:h-[45px] max-md:text-[0.62rem]
              max-[480px]:w-[60px] max-[480px]:h-[38px] max-[480px]:text-[0.52rem]
              hover:-translate-y-[8px]
              ${isActive
                ? `border-2 border-gold text-gold
                   shadow-[0_0_20px_rgba(212,175,55,0.5),0_6px_15px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
                   hover:shadow-[0_0_25px_rgba(212,175,55,0.7),0_10px_20px_rgba(0,0,0,0.5)]`
                : `border-2 border-[#6a5840] text-[#b89968]
                   shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]
                   hover:border-[#8a7860] hover:text-[#d4af37]
                   hover:shadow-[0_6px_15px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]`
              }
            `}
            style={{
              background: isActive
                ? 'linear-gradient(180deg, #4a3820 0%, #3a2810 50%, #2a1800 100%)'
                : 'linear-gradient(180deg, #3a2810 0%, #2a1800 50%, #1a0f00 100%)',
            }}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
