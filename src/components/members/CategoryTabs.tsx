'use client';

import { categories } from '@/data/categories';

interface CategoryTabsProps {
  current: string;
  onChange: (id: string) => void;
}

export default function CategoryTabs({ current, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 absolute bottom-[-25px] left-5 z-[1]
      max-md:left-[15px] max-md:gap-1.5 max-md:bottom-[-20px]
      max-[480px]:left-2.5 max-[480px]:gap-1 max-[480px]:bottom-[-18px]">
      {categories.map((cat) => {
        const isActive = cat.id === current;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`
              flex items-start justify-center text-center font-semibold cursor-pointer
              transition-all duration-200 ease-in-out rounded-lg
              w-[87px] text-[0.75rem] pt-2
              max-md:w-[70px] max-md:text-[0.65rem] max-md:pt-1.5
              max-[480px]:w-[55px] max-[480px]:text-[0.55rem] max-[480px]:pt-1.5
              ${isActive
                ? `h-[60px] max-md:h-[48px] max-[480px]:h-[42px] pt-2.5
                   max-md:pt-2 max-[480px]:pt-1.5
                   border-2 border-gold text-gold
                   shadow-[0_0_15px_rgba(255,215,0,0.3),0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
                   hover:-translate-y-[15px] max-md:hover:-translate-y-3 max-[480px]:hover:-translate-y-2.5
                   hover:shadow-[0_0_20px_rgba(255,215,0,0.4),0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]`
                : `h-[50px] max-md:h-[40px] max-[480px]:h-[35px]
                   border-2 border-[#4a3a2a] text-[#8a7a6a]
                   shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]
                   hover:-translate-y-[15px] max-md:hover:-translate-y-3 max-[480px]:hover:-translate-y-2.5
                   hover:text-[#b0a090]
                   hover:shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]`
              }
            `}
            style={{
              background: isActive
                ? 'linear-gradient(180deg, #3a2a1a 0%, #2a1d13 50%, #1a1008 100%)'
                : 'linear-gradient(180deg, #3a2a1a 0%, #2a1d13 50%, #1a1008 100%)',
            }}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
