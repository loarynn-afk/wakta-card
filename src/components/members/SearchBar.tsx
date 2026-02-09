'use client';

import { useRef, useCallback } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch(e.target.value);
    }, 300);
  }, [onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="검색"
        onChange={handleInput}
        className="w-[220px] max-md:w-full py-2.5 pl-[18px] pr-[45px] rounded-[25px]
          border-2 border-[#6a5040] text-[#f0e6d0] font-[var(--font-pretendard)]
          text-[0.9rem] outline-none transition-all duration-200
          placeholder:text-[#9a8a7a]
          focus:border-gold focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_15px_rgba(255,215,0,0.3)]"
        style={{
          background: 'linear-gradient(180deg, #5a4035 0%, #4a3025 50%, #3a2015 100%)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)',
        }}
      />
      <span className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[0.9rem] text-gold
        pointer-events-none font-bold">
        Q
      </span>
    </div>
  );
}
