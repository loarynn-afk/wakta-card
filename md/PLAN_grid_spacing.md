# 카드 그리드 간격 균일화 계획

## 목표
- 카드 간 상하좌우 간격을 동일하게 맞추기
- 모바일에서 하스스톤처럼 카드가 화면에 맞게 유동 크기

## 변경 방식

### MemberGrid.tsx
- PC (768px 이상): 기존 `auto-fill` 유지하되 gap 통일
- 모바일 (768px 미만): `grid-template-columns: repeat(2, 1fr)` + 카드가 컬럼 너비에 맞춰 자동 크기 조절

### MemberCard.tsx
- PC: `w-[var(--card-width)]` `h-[var(--card-height)]` 고정
- 모바일: `w-full` + `aspect-ratio: 310/497` (카드 비율 유지, 너비에 따라 높이 자동)

### globals.css
- 변경 없음 (--card-width, --card-height은 PC용으로 유지)

## 간격 설정
- PC: `gap: 25px`, `padding: 0`
- 모바일: `gap: 12px`, 컨테이너 `padding: 12px` (gap = padding으로 상하좌우 동일)

## 영향 범위
- MemberGrid.tsx
- MemberCard.tsx
- (2개 파일만 수정)
