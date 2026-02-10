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
      className="grid gap-[30px] justify-items-center"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(var(--card-width), 1fr))',
      }}
    >
      {members.map((member) => (
        <MemberCard key={member.id} member={member} onClick={onCardClick} />
      ))}
    </div>
  );
}
