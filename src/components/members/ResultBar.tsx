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
      border-b border-[rgba(100,140,255,0.1)] max-md:flex-col max-md:items-start">
      <div className="text-[#8a9ac0] text-[0.95rem]">
        <span className="text-text-light font-semibold">{count}</span>명의 멤버 |{' '}
        <span className="text-text-muted">
          필터: &quot;<span className="text-gold">{filterName}</span>&quot;
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="text-text-muted text-[0.9rem]">정렬:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="py-2 px-3 border border-[#2a3555] rounded-md
            text-[#c0c8e0] font-[var(--font-pretendard)] cursor-pointer transition-all duration-200
            hover:border-[#3a4a70] focus:outline-none focus:border-gold"
          style={{
            background: 'linear-gradient(180deg, #0a1530 0%, #000613 100%)',
          }}
        >
          <option value="default">기본</option>
          <option value="name">이름순</option>
        </select>
      </div>
    </div>
  );
}
