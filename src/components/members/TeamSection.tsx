'use client';

import { useMemo } from 'react';
import { Member } from '@/types';
import { members as allMembers } from '@/data/members';
import MemberCard from './MemberCard';

interface TeamSectionProps {
  members: Member[];
  onCardClick: (member: Member) => void;
}

function getTeamOrder(): string[] {
  const order: string[] = [];
  allMembers.forEach((m) => {
    const team = m.description;
    if (team && !order.includes(team) && team !== '테스트') {
      order.push(team);
    }
  });
  return order;
}

export default function TeamSection({ members, onCardClick }: TeamSectionProps) {
  const groups = useMemo(() => {
    const map: Record<string, Member[]> = {};
    members.forEach((member) => {
      const team = member.description || 'etc';
      if (!map[team]) map[team] = [];
      map[team].push(member);
    });

    const teamOrder = getTeamOrder();
    const sortedKeys = Object.keys(map).sort((a, b) => {
      const idxA = teamOrder.indexOf(a);
      const idxB = teamOrder.indexOf(b);
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });

    return sortedKeys.map((key) => ({ team: key, members: map[key] }));
  }, [members]);

  return (
    <div>
      {groups.map(({ team, members: teamMembers }) => (
        <div key={team} className="mb-10 w-full">
          <div className="flex items-center gap-3 mb-[18px] pb-2.5 border-b-2 border-black/10">
            <span className="text-[1.15rem] font-bold text-text-dark">{team}</span>
            <span className="text-[0.8rem] text-text-muted bg-parchment-dark py-0.5 px-2.5 rounded-xl">
              {teamMembers.length}
            </span>
          </div>
          <div
            className="grid gap-[25px] justify-items-center"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(var(--card-width), 1fr))' }}
          >
            {teamMembers.map((member) => (
              <MemberCard key={member.id} member={member} onClick={onCardClick} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
