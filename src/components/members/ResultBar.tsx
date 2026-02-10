'use client';

interface ResultBarProps {
  count: number;
  filterName: string;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function ResultBar({ count, filterName, sortBy, onSortChange }: ResultBarProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 py-5 mb-6
      border-b-2 border-[#d4af37]/20 max-md:flex-col max-md:items-start">
      <div className="text-text-dark text-[0.95rem] font-medium">
        <span className="text-gold font-bold text-base">{count}</span>
        <span className="text-[#6a5a4a]">명의 멤버</span>
        <span className="text-[#8a7a6a] mx-2">|</span>
        <span className="text-[#6a5a4a]">필터:</span>
        <span className="text-gold font-semibold ml-1">{filterName}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[#8a7a6a] text-[0.9rem] font-semibold">정렬:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="py-2 px-4 bg-parchment-dark border-2 border-[#b8a080] rounded-md
            text-text-dark font-[var(--font-pretendard)] font-medium cursor-pointer 
            transition-all duration-200 text-[0.9rem]
            hover:border-[#d4af37] hover:bg-parchment
            focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(212,175,55,0.3)]"
          style={{
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        >
          <option value="default">기본</option>
          <option value="name">이름순</option>
        </select>
      </div>
    </div>
  );
}
