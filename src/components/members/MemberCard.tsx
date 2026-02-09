'use client';

import Image from 'next/image';
import { Member } from '@/types';
import { categories } from '@/data/categories';

interface MemberCardProps {
  member: Member;
  onClick: (member: Member) => void;
}

function getCategoryName(categoryIds: string[]): string {
  return categoryIds
    .map((id) => {
      const cat = categories.find((c) => c.id === id);
      return cat ? cat.name : id;
    })
    .join(' / ');
}

export default function MemberCard({ member, onClick }: MemberCardProps) {
  return (
    <div
      className="w-[var(--card-width)] h-[var(--card-height)] cursor-pointer relative
        transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        hover:-translate-y-[15px] hover:scale-105 hover:z-10
        group"
      onClick={() => onClick(member)}
    >
      <div
        className="w-full h-full rounded-[var(--card-radius)] border-3 border-[#6a6a8a]
          overflow-hidden transition-all duration-300
          group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.4),0_0_30px_rgba(255,215,0,0.3)]"
        style={{
          background: 'linear-gradient(145deg, #4a4a6a 0%, #2a2a4a 50%, #1a1a3a 100%)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {member.cardImage ? (
          <Image
            src={member.cardImage}
            alt={member.name}
            fill
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-5 text-center"
            style={{ background: 'linear-gradient(145deg, #3a3a5a 0%, #2a2a4a 100%)' }}
          >
            <div className="text-text-light text-base font-bold
              [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] leading-tight break-keep mb-2
              max-[480px]:text-[0.85rem]">
              {member.name}
            </div>
            <div className="text-gold text-xs font-medium">
              {getCategoryName(member.category)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
