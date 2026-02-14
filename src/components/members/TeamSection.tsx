'use client';

import { useState, useMemo } from 'react';
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
    if (team && !order.includes(team) && team !== '테스트' && team !== '왁타버스 리더') {
      order.push(team);
    }
  });
  return order;
}

export default function TeamSection({ members, onCardClick }: TeamSectionProps) {
  const [selectedTeams, setSelectedTeams] = useState<Set<string>>(new Set());

  const teams = useMemo(() => {
    const teamOrder = getTeamOrder();
    const teamSet = new Set<string>();
    members.forEach((m) => {
      if (m.description && m.description !== '테스트') {
        teamSet.add(m.description);
      }
    });
    return teamOrder.filter((t) => teamSet.has(t));
  }, [members]);

  const isAllSelected = selectedTeams.size === 0;

  const toggleTeam = (team: string) => {
    setSelectedTeams((prev) => {
      const next = new Set(prev);
      if (next.has(team)) {
        next.delete(team);
      } else {
        next.add(team);
      }
      return next;
    });
  };

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

    return sortedKeys
      .filter((key) => isAllSelected || selectedTeams.has(key))
      .map((key) => ({ team: key, members: map[key] }));
  }, [members, selectedTeams, isAllSelected]);

  return (
    <div>
      {/* 크루 필터 버튼 */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedTeams(new Set())}
          className={`px-4 py-[6px] rounded-full text-[0.82rem] font-semibold transition-all duration-200
            ${isAllSelected
              ? 'bg-[#1a3a6a] text-white border border-[#3a6aaa]'
              : 'bg-transparent text-[#8a9ac0] border border-[rgba(100,140,255,0.2)] hover:border-[rgba(100,140,255,0.4)] hover:text-[#a0b4d8]'
            }`}
        >
          전체
          <span className="ml-1.5 text-[0.72rem] opacity-70">{members.length}</span>
        </button>
        {teams.map((team) => {
          const count = members.filter((m) => m.description === team).length;
          const isActive = selectedTeams.has(team);
          return (
            <button
              key={team}
              onClick={() => toggleTeam(team)}
              className={`px-4 py-[6px] rounded-full text-[0.82rem] font-semibold transition-all duration-200
                ${isActive
                  ? 'bg-[#1a3a6a] text-white border border-[#3a6aaa]'
                  : 'bg-transparent text-[#8a9ac0] border border-[rgba(100,140,255,0.2)] hover:border-[rgba(100,140,255,0.4)] hover:text-[#a0b4d8]'
                }`}
            >
              {team}
              <span className="ml-1.5 text-[0.72rem] opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {/* 크루별 섹션 */}
      {groups.map(({ team, members: teamMembers }) => (
        <div key={team} className="mb-10 w-full">
          <div className="flex items-center gap-3 mb-[18px] pb-2.5 border-b-2 border-black/10">
            <span className="text-[1.15rem] font-bold text-text-dark">{team}</span>
            <span className="text-[0.8rem] text-text-muted bg-parchment-dark py-0.5 px-2.5 rounded-xl">
              {teamMembers.length}
            </span>
          </div>
          <div
            className="grid gap-x-[25px] gap-y-[50px] justify-items-center
              max-md:!grid-cols-2 max-md:gap-x-3 max-md:gap-y-[30px] max-md:px-3
              md:[grid-template-columns:repeat(auto-fill,minmax(var(--card-width),1fr))]"
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
