'use client';

interface ResultBarProps {
  count: number;
  filterName: string;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function ResultBar({ count, filterName, sortBy, onSortChange }: ResultBarProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 py-4 mb-5
      border-b-2 border-black/10 max-md:flex-col max-md:items-start">
      <div className="text-text-dark text-[0.95rem]">
        <span>{count}</span>명의 멤버 |{' '}
        <span className="text-text-muted">
          필터: &quot;<span>{filterName}</span>&quot;
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="text-text-muted text-[0.9rem]">정렬:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="py-2 px-3 bg-parchment-dark border border-[#b8a080] rounded-md
            text-text-dark font-[var(--font-pretendard)] cursor-pointer transition-all duration-200
            hover:border-[#8b7355] focus:outline-none focus:border-gold-dark"
        >
          <option value="default">기본</option>
          <option value="name">이름순</option>
        </select>
      </div>
    </div>
  );
}
