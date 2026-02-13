'use client';

import { Member } from '@/types';
import MemberCard from './MemberCard';

interface MemberGridProps {
  members: Member[];
  onCardClick: (member: Member) => void;
}

export default function MemberGrid({ members, onCardClick }: MemberGridProps) {
  return (
    <div
      className="grid gap-x-[25px] gap-y-[50px] justify-items-center
        max-md:!grid-cols-2 max-md:gap-x-3 max-md:gap-y-[30px] max-md:px-3
        md:[grid-template-columns:repeat(auto-fill,minmax(var(--card-width),1fr))]"
    >
      {members.map((member) => (
        <MemberCard key={member.id} member={member} onClick={onCardClick} />
      ))}
    </div>
  );
}
