'use client';

import { useState, useMemo, useCallback } from 'react';
import { Member } from '@/types';
import { categories } from '@/data/categories';
import { members } from '@/data/members';
import CategoryTabs from '@/components/members/CategoryTabs';
import SearchBar from '@/components/members/SearchBar';
import ResultBar from '@/components/members/ResultBar';
import MemberGrid from '@/components/members/MemberGrid';
import TeamSection from '@/components/members/TeamSection';
import MemberModal from '@/components/members/MemberModal';

export default function MembersPage() {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filtered = useMemo(() => {
    let result = [...members];

    if (category !== 'all') {
      result = result.filter((m) => m.category.includes(category));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    }

    return result;
  }, [category, searchQuery, sortBy]);

  const filterName = useMemo(() => {
    const cat = categories.find((c) => c.id === category);
    return cat ? cat.name : category;
  }, [category]);

  const useGrouping = category === 'gomemgomem' || category === 'middle';

  const handleCardClick = useCallback((member: Member) => {
    setSelectedMember(member);
  }, []);

  return (
    <>
      {/* 배너 */}
      <section className="relative min-h-[320px] flex flex-col items-center justify-center
        overflow-visible pb-[35px] max-md:min-h-[280px] max-[480px]:min-h-[240px]">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(ellipse at center, rgba(40, 60, 120, 0.5) 0%, rgba(0, 6, 19, 0.95) 70%),
              linear-gradient(135deg, #0a1535 0%, #000613 100%)`,
          }}
        />

        {/* 배경 글로우 효과 */}
        <div className="absolute inset-0 z-0 glow-pulse"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(60, 100, 220, 0.12) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-[1] text-center py-12 px-5 pb-[70px] max-md:pb-[60px] max-[480px]:pb-[50px]">
          {/* Decorative icon */}


          <h1 className="text-[2.4rem] font-black text-text-light
            [text-shadow:0_3px_10px_rgba(0,0,0,0.7),0_0_30px_rgba(60,100,220,0.15)] mb-2
            max-md:text-[1.8rem] max-[480px]:text-[1.4rem] tracking-wide">
            왁타버스 멤버 카드
          </h1>
          <p className="text-[#8a9ac0] text-[0.95rem] font-semibold
            [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]
            max-md:text-[0.85rem] max-[480px]:text-[0.75rem]">
            왁타버스 멤버들을 만나보세요
          </p>
        </div>

        <CategoryTabs current={category} onChange={setCategory} />
      </section>

      {/* 필터 섹션 (검색바) - A안: 수평 글로우 라인 */}
      <section className="relative z-[5]" style={{ background: '#000613' }}>
        {/* 상단 글로우 라인 */}
        <div className="glow-line-top absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px pointer-events-none" />
        {/* 상단 글로우 번짐 */}
        <div className="glow-spread-top absolute -top-px left-1/2 -translate-x-1/2 w-[40%] h-5 pointer-events-none" />
        {/* 하단 글로우 라인 */}
        <div className="glow-line-bottom absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px pointer-events-none" />
        {/* 하단 글로우 번짐 */}
        <div className="glow-spread-bottom absolute -bottom-px left-1/2 -translate-x-1/2 w-[40%] h-5 pointer-events-none" />
        <div className="mx-auto max-w-[1400px] py-[18px] px-5 flex items-center justify-end gap-6
          max-md:justify-center">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </section>

      {/* 메인 컨텐츠 */}
      <main
        className="min-h-[70vh] pb-16"
        style={{
          background: 'linear-gradient(180deg, #000613 0%, #030b1a 50%, #000613 100%)',
        }}
      >
        <div className="mx-auto max-w-[1400px] p-5">
          <ResultBar
            count={filtered.length}
            filterName={filterName}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          {useGrouping ? (
            <TeamSection members={filtered} onCardClick={handleCardClick} />
          ) : (
            <MemberGrid members={filtered} onCardClick={handleCardClick} />
          )}
        </div>
      </main>

      {/* 모달 */}
      <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </>
  );
}
