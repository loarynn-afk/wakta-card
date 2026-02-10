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
    <div className="relative group">
      <input
        type="text"
        placeholder="멤버 검색"
        onChange={handleInput}
        className="w-[240px] max-md:w-full py-2.5 pl-[18px] pr-[48px] rounded-full
          border-2 text-[#f0e6d0] font-[var(--font-pretendard)]
          text-[0.9rem] outline-none transition-all duration-200
          placeholder:text-[#9a8a7a]
          border-[#8a6a4a] group-hover:border-[#a88a5a]
          focus:border-gold focus:shadow-[0_0_20px_rgba(212,175,55,0.4),inset_0_2px_4px_rgba(0,0,0,0.3)]"
        style={{
          background: 'linear-gradient(180deg, #6a5040 0%, #5a4030 50%, #4a3020 100%)',
          boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
        }}
      />
      <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[1.1rem] text-gold
        pointer-events-none font-bold [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
        S
      </span>
    </div>
  );
}
