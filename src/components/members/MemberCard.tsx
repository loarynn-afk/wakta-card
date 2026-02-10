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
        hover:-translate-y-[12px] group"
      onClick={() => onClick(member)}
    >
      {/* Ornate outer border with glow */}
      <div
        className="absolute inset-0 rounded-lg opacity-75 transition-all duration-300
          group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, #d4af37 0%, #a08968 25%, #5a4a32 50%, #a08968 75%, #d4af37 100%)',
          padding: '2px',
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-[5px] opacity-0 group-hover:opacity-100
            transition-opacity duration-300"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.4), transparent)',
            filter: 'blur(12px)',
            boxShadow: '0 0 20px rgba(212,175,55,0.5)',
          }}
        />
        {/* Inner card */}
        <div
          className="w-full h-full rounded-md border-2 border-[#3a2a1a] overflow-hidden
            transition-all duration-300
            group-hover:shadow-[0_0_30px_rgba(212,175,55,0.6),0_15px_40px_rgba(0,0,0,0.5)]"
          style={{
            background: 'linear-gradient(180deg, #2a1a0a 0%, #1a0f05 100%)',
            boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.1), 0 8px 20px rgba(0,0,0,0.5)',
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
              className="w-full h-full flex flex-col items-center justify-center p-4 text-center
                relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #3a2a1a 0%, #2a1a0a 50%, #1a0f05 100%)',
              }}
            >
              {/* Background shimmer effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at center, rgba(212,175,55,0.5) 0%, transparent 70%)',
                }}
              />
              
              <div className="relative z-10">
                <div className="text-text-light text-sm font-bold
                  [text-shadow:0_2px_6px_rgba(0,0,0,0.8)] leading-tight break-keep mb-2
                  max-[480px]:text-[0.75rem]">
                  {member.name}
                </div>
                <div className="text-gold text-[0.7rem] font-semibold
                  [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                  {getCategoryName(member.category)}
                </div>
              </div>
            </div>
          )}

          {/* Bottom gold bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b
              from-[#8b7355] via-[#a08968] to-[#6a5a42] border-t border-[#d4af37]
              flex items-center justify-center"
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 -1px 3px rgba(0,0,0,0.3)',
            }}
          >
            <div className="text-[0.65rem] font-bold text-[#2a1a0a]
              [text-shadow:0_1px_1px_rgba(255,255,255,0.2)]">
              {member.name.substring(0, 8)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
