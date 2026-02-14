# Wakta-Card Next.js 전체 아키텍처 문서

> 최종 업데이트: 2026-02-15 | 버전: v0.9.1+

---

## 1. 프로젝트 개요

왁타버스(Waktaverse) 멤버들을 카드 형태로 소개하는 팬메이드 웹 애플리케이션.
하스스톤 카드 라이브러리 디자인에서 영감을 받은 다크 블루 판타지 테마를 적용했다.

---

## 2. 기술 스택

| 구분 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Next.js (App Router) | 16.1.6 |
| 언어 | TypeScript | 5.x |
| UI 라이브러리 | React | 19.2.3 |
| 스타일링 | Tailwind CSS v4 | 4.x |
| 폰트 | Pretendard (CDN) | 1.3.9 |
| 이미지 최적화 | Sharp (WebP 변환) | 0.34.5 |
| 배포 | Vercel (GitHub 연동) | - |
| 버전 관리 | Git + Semantic Versioning | - |

---

## 3. 디렉토리 구조

```
wakta-card-next/
├── public/
│   └── assets/
│       ├── cards/              # 원본 카드 이미지 (PNG)
│       ├── cards-webp/         # 최적화된 카드 이미지 (WebP, 빌드 시 자동 생성)
│       └── icons/              # SNS 플랫폼 아이콘 (YouTube, SOOP, 카페)
│
├── scripts/
│   └── optimize-images.mjs    # PNG → WebP 변환 스크립트 (prebuild에서 자동 실행)
│
├── src/
│   ├── app/                   # Next.js App Router 페이지
│   │   ├── globals.css        # 전역 스타일 (Tailwind 테마, 애니메이션, 글로우 효과)
│   │   ├── layout.tsx         # 루트 레이아웃 (Header, Footer, 메타데이터)
│   │   ├── page.tsx           # / → /members 리다이렉트
│   │   └── members/
│   │       └── page.tsx       # 메인 멤버 목록 페이지 (클라이언트 컴포넌트)
│   │
│   ├── components/
│   │   ├── Header.tsx         # 상단 네비게이션 바
│   │   ├── Footer.tsx         # 하단 푸터
│   │   └── members/
│   │       ├── CategoryTabs.tsx   # 카테고리 탭 (ALL, 고정멤버, 중간계, 크루)
│   │       ├── SearchBar.tsx      # 검색 입력 (디바운스 300ms)
│   │       ├── ResultBar.tsx      # 검색 결과 카운트 + 정렬 셀렉트
│   │       ├── MemberGrid.tsx     # 카드 그리드 레이아웃
│   │       ├── MemberCard.tsx     # 개별 카드 컴포넌트 (이미지 + SNS 링크)
│   │       ├── TeamSection.tsx    # 크루 탭 전용 (그룹 헤더 + 필터 버튼)
│   │       └── MemberModal.tsx    # 상세 모달 (현재 비활성화, 코드 보존)
│   │
│   ├── data/
│   │   ├── categories.ts      # 카테고리 정의 (all, fixed, middle, gomemgomem)
│   │   └── members.ts         # 전체 멤버 데이터 (164명)
│   │
│   └── types/
│       └── index.ts           # TypeScript 인터페이스 (Member, Category)
│
├── md/                        # 세션 로그 및 기획 문서
├── GIT_GUIDE.md               # Git 버전 관리 가이드
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## 4. 데이터 모델

### 4.1 Member 인터페이스

```typescript
interface Member {
  id: number;          // 고유 식별자
  name: string;        // 멤버 이름
  category: string[];  // 소속 카테고리 배열 (복수 소속 가능)
  cardImage: string;   // 카드 이미지 경로 (PNG, 런타임에 WebP로 변환)
  description: string; // 크루/소속 설명 (크루 탭 그룹핑에 사용)
  youtubeUrl: string;  // YouTube 채널 URL
  soopUrl: string;     // SOOP 방송 URL
}
```

### 4.2 Category 인터페이스

```typescript
interface Category {
  id: string;   // 내부 식별자 (all, fixed, middle, gomemgomem)
  name: string; // 표시 이름 (ALL, 고정멤버, 중간계, 크루)
}
```

### 4.3 카테고리 체계

| id | 표시명 | 설명 |
|----|--------|------|
| all | ALL | 전체 멤버 (이세돌 포함) |
| fixed | 고정멤버 | 고정 멤버 |
| middle | 중간계 | 중간계 멤버 (플랫 그리드) |
| gomemgomem | 크루 | 크루별 그룹 표시 + 해시태그 필터 |

### 4.4 멤버 분류

| 그룹 | category 값 | 인원 |
|------|-------------|------|
| 우왁굳 | waktaverse | 1명 |
| 이세돌 | isedol | 6명 (ALL 탭에서만 표시) |
| 고정멤버 | fixed | 36명 |
| 중간계 전용 | middle | 중간계 탭에서만 표시 |
| 크루 겸 중간계 | middle + gomemgomem | 양쪽 탭에서 표시 |

---

## 5. 컴포넌트 관계도

```
layout.tsx
├── Header.tsx
├── members/page.tsx (MembersPage - 클라이언트 컴포넌트)
│   ├── CategoryTabs.tsx ──── categories.ts 참조
│   ├── SearchBar.tsx ──────── 디바운스 검색어 전달
│   ├── ResultBar.tsx ──────── 필터링 결과 카운트 표시
│   ├── MemberGrid.tsx ─────── category !== 'gomemgomem' 일 때
│   │   └── MemberCard.tsx ×N
│   ├── TeamSection.tsx ────── category === 'gomemgomem' 일 때
│   │   ├── 크루 필터 버튼 (전체/개별 크루)
│   │   └── 크루 그룹
│   │       └── MemberCard.tsx ×N
│   └── MemberModal.tsx ────── 현재 비활성화 (주석 처리)
└── Footer.tsx
```

---

## 6. 상태 관리

MembersPage가 모든 상태를 관리하는 단일 상태 소유자 패턴을 사용한다.

| 상태 | 타입 | 초기값 | 용도 |
|------|------|--------|------|
| category | string | 'all' | 현재 선택된 카테고리 탭 |
| searchQuery | string | '' | 검색어 (디바운스 적용) |
| sortBy | string | 'default' | 정렬 방식 (기본/이름순) |
| selectedMember | Member or null | null | 모달에 표시할 멤버 (현재 미사용) |

필터링 로직은 `useMemo`로 메모이제이션되어 category, searchQuery, sortBy가 변경될 때만 재계산된다.

TeamSection 내부에는 크루 필터용 `selectedTeams` (Set) 로컬 상태가 별도로 존재한다.

---

## 7. 스타일 시스템

### 7.1 Tailwind v4 커스텀 테마 (globals.css의 @theme inline)

| 변수 | 값 | 용도 |
|------|-----|------|
| --color-parchment | #000613 | 기본 배경색 |
| --color-gold | #0041a1 | 강조 색상 (파란 계열) |
| --color-text-light | #ffffff | 밝은 텍스트 |
| --color-text-dark | #c0c8e0 | 기본 텍스트 |
| --color-text-muted | #6a7a9a | 보조 텍스트 |
| --card-width | 200px (PC) / 150px (태블릿) / 130px (모바일) | 카드 너비 |
| --card-height | 320px (PC) / 240px (태블릿) / 208px (모바일) | 카드 높이 |

### 7.2 애니메이션

| 이름 | 용도 |
|------|------|
| modalFadeIn | 모달 열기 애니메이션 |
| glowPulse | 배너 배경 글로우 펄스 |
| subtleFloat | 미세한 플로팅 효과 |

### 7.3 반응형 브레이크포인트

| 브레이크포인트 | 변경 사항 |
|---------------|-----------|
| max-width: 768px (md) | 카드 크기 축소, 2열 그리드, 글로우 라인 강화 |
| max-width: 480px | 카드 크기 추가 축소, 탭 크기 축소 |

---

## 8. 이미지 최적화 파이프라인

```
PNG 원본 (cards/)
    │
    ▼ scripts/optimize-images.mjs (prebuild 시 자동 실행)
    │
WebP 변환 (cards-webp/, quality: 80)
    │
    ▼ MemberCard.tsx의 toWebP() 함수
    │
브라우저에서 WebP로 로딩 (lazy loading 적용)
```

toWebP 함수가 런타임에 경로를 변환한다:
- `/assets/cards/곽춘식.png` → `/assets/cards-webp/곽춘식.webp`

---

## 9. 라우팅

| 경로 | 컴포넌트 | 설명 |
|------|---------|------|
| / | page.tsx | /members로 자동 리다이렉트 |
| /members | members/page.tsx | 멤버 목록 (메인 페이지) |

---

## 10. 빌드 프로세스

```
npm run build
    │
    ├── 1) prebuild: optimize-images.mjs 실행 (PNG → WebP)
    │
    └── 2) next build: Next.js 프로덕션 빌드
```

---

## 11. 향후 개발 예정 사항

| 기능 | 상태 | 비고 |
|------|------|------|
| 카드 클릭 상세 페이지 | 계획 | 나무위키 스타일 상세 페이지 (모달 코드 보존 중) |
| 가챠 시스템 | 구상 | 카드 뽑기 + 레어도 시스템 |
| 홀로그래픽 이펙트 | 구상 | Three.js/Pixi.js 기반 카드 효과 |
| 카드 컬렉션 저장 | 구상 | Firebase 등 클라우드 저장 |
| 전체 멤버 카드 이미지 | 진행 중 | 현재 고정멤버 36장 완료 |

---

## 12. 파일별 역할 요약

| 파일 | 줄 수(추정) | 핵심 역할 |
|------|------------|-----------|
| members/page.tsx | ~110 | 페이지 컨트롤러 (상태, 필터링, 레이아웃) |
| MemberCard.tsx | ~65 | 카드 렌더링 + SNS 링크 아이콘 바 |
| MemberGrid.tsx | ~20 | 그리드 레이아웃 래퍼 |
| TeamSection.tsx | ~110 | 크루별 그룹 + 필터 버튼 |
| CategoryTabs.tsx | ~55 | 카테고리 탭 UI |
| SearchBar.tsx | ~35 | 디바운스 검색 입력 |
| ResultBar.tsx | ~30 | 결과 카운트 + 정렬 |
| MemberModal.tsx | ~90 | 상세 모달 (비활성화) |
| members.ts | ~170 | 전체 멤버 데이터 (164명) |
| categories.ts | ~8 | 카테고리 정의 (4개) |
| globals.css | ~100 | 테마, 애니메이션, 반응형 |
| optimize-images.mjs | ~45 | 이미지 최적화 스크립트 |
