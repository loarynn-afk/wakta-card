'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Member } from '@/types';
import { categories } from '@/data/categories';

interface MemberModalProps {
  member: Member | null;
  onClose: () => void;
}

function getCategoryName(categoryIds: string[]): string {
  return categoryIds
    .map((id) => {
      const cat = categories.find((c) => c.id === id);
      return cat ? cat.name : id;
    })
    .join(' / ');
}

export default function MemberModal({ member, onClose }: MemberModalProps) {
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (member) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeydown);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [member, handleKeydown]);

  if (!member) return null;

  const hasYoutube = member.youtubeUrl?.trim();
  const hasSoop = member.soopUrl?.trim();

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[2000]
        p-5 backdrop-blur-[5px]"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="rounded-2xl border-3 border-[#4a4a6a] max-w-[700px] w-full max-h-[90vh]
          overflow-auto relative animate-modal-fade-in"
        style={{
          background: 'linear-gradient(145deg, #2a2a3a 0%, #1a1a2a 100%)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(100,100,150,0.2)',
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-[15px] right-[15px] w-10 h-10 rounded-full
            bg-white/10 border-2 border-white/20 text-text-light text-2xl
            cursor-pointer flex items-center justify-center transition-all duration-200
            hover:bg-white/20 hover:border-gold hover:text-gold hover:rotate-90 z-10"
        >
          x
        </button>

        {/* 본문 */}
        <div className="flex gap-[30px] p-10 max-md:flex-col max-md:items-center max-md:pt-[50px] max-md:px-5 max-md:pb-[30px]">
          {/* 카드 미리보기 */}
          <div className="shrink-0 w-[220px] max-md:w-[180px]">
            <div
              className="w-full aspect-[310/497] rounded-[var(--card-radius)] border-3 border-[#6a6a8a]
                overflow-hidden flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(145deg, #4a4a6a 0%, #2a2a4a 100%)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
              }}
            >
              {member.cardImage ? (
                <Image
                  src={member.cardImage}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className="flex flex-col items-center justify-center p-5 text-center w-full h-full"
                  style={{ background: 'linear-gradient(145deg, #3a3a5a 0%, #2a2a4a 100%)' }}
                >
                  <div className="text-text-light text-xl font-bold">{member.name}</div>
                </div>
              )}
            </div>
          </div>

          {/* 멤버 정보 */}
          <div className="flex-1 flex flex-col justify-center min-w-0 max-md:text-center">
            <h2 className="text-[1.8rem] font-black text-text-light mb-1.5 max-md:text-2xl">
              {member.name}
            </h2>
            <p className="text-gold text-[0.9rem] font-semibold mb-4">
              {getCategoryName(member.category)}
            </p>
            <div className="h-0.5 mb-4"
              style={{ background: 'linear-gradient(90deg, transparent, #4a4a6a, transparent)' }} />
            <p className="text-white/80 text-base leading-[1.8] mb-6">
              {member.description}
            </p>

            {/* 링크 버튼 */}
            <div className="flex items-center gap-4 flex-wrap max-md:justify-center">
              <a
                href={hasYoutube || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 py-1.5 no-underline font-semibold text-[0.9rem]
                  transition-all duration-200 hover:opacity-80
                  ${!hasYoutube ? 'opacity-40 pointer-events-none' : ''}`}
              >
                <Image src="/assets/icons/youtube.svg" alt="YouTube" width={24} height={24} />
                <span className="text-[#ff0000]">유튜브</span>
              </a>
              <a
                href={hasSoop || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 py-1.5 no-underline font-semibold text-[0.9rem]
                  transition-all duration-200 hover:opacity-80
                  ${!hasSoop ? 'opacity-40 pointer-events-none' : ''}`}
              >
                <Image src="/assets/icons/soop.svg" alt="SOOP" width={24} height={24} />
                <span className="text-[#0a7cff]">SOOP</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
