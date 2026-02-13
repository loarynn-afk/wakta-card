'use client';

import Image from 'next/image';
import { Member } from '@/types';

interface MemberCardProps {
  member: Member;
  onClick: (member: Member) => void;
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
          group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.4),0_0_30px_rgba(0,65,161,0.3)]"
        style={{
          background: 'linear-gradient(145deg, #4a4a6a 0%, #2a2a4a 50%, #1a1a3a 100%)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        <Image
          src={member.cardImage || '/assets/cards/default.png'}
          alt={member.name}
          fill
          className="object-cover"
          loading="lazy"
        />

        {/* 하단 아이콘 바 */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 py-2 px-3
          bg-gradient-to-t from-black/40 to-transparent">
          <Image src="/assets/icons/93f58aefbf3abc28.png" alt="YouTube" width={32} height={32} className="opacity-80" />
          <Image src="/assets/icons/1a7237ede64fc98a.png" alt="SOOP" width={48} height={20} className="opacity-80" />
          <Image src="/assets/icons/sns_.png" alt="cafe" width={28} height={28} className="opacity-80" />
        </div>
      </div>
    </div>
  );
}
