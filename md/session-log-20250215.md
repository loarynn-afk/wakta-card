# wakta-card 세션 로그 - 2025.02.15

## v0.9.3 ~ v0.9.7 작업 내역

### v0.9.3: 카드 이미지 36개 업데이트
- 디자이너 제공 새 카드 이미지 36개 적용
- 신규 연결 18명: 김치만두, 단답벌레, 도파민박사, 뢴트게늄, 비밀소녀, 비즈니스킴, 왁파고, 풍신, 해루석, 히키킹, 독고혜지, 부정형인간, 소피아, 이덕수 할아바이, 티파니, 아르바, 융터르, 호드
- 경로 변경 2명: 빅토리(.webp→.png), 샬롯(성기사샬롯.webp→샬롯.png)
- default.png 기본 카드 이미지 교체

### v0.9.5: 검색바 섹션 디자인 개선
- 필터 섹션 배경: 단일색 → 세로 그라데이션 (#060e1f → #0c1a30 → #060e1f)
- 상하 미세한 파란 빛 테두리 라인 추가
- 중앙 타원형 글로우 효과 추가

### v0.9.6: 아이콘 img 태그 전환
- MemberCard.tsx: 하단 아이콘(YouTube, SOOP, cafe) Next.js Image → img 태그 전환
- import Image from 'next/image' 제거
- Vercel 배포 환경에서 아이콘 미표시 문제 해결

### v0.9.7: WebP 이미지 최적화
- sharp 라이브러리 도입 (devDependencies)
- scripts/optimize-images.mjs 생성: PNG → WebP 자동 변환 (quality: 80)
- 변환 결과: 평균 92~93% 용량 감소 (각 ~1MB → ~70-80KB)
- MemberCard.tsx: toWebP() 함수로 자동 경로 변환
- MemberModal.tsx: WebP 경로 적용 + img 태그 전환
- package.json: "optimize", "prebuild" 스크립트 추가
- cards-webp/ 폴더에 변환된 37개 WebP 파일 저장

## 기술 이슈 & 해결

### Next.js Image 동시 로드 문제
- 증상: 36개 대용량 PNG 이미지를 Next.js Image로 로드 시 일부 이미지가 랜덤으로 미표시
- 원인: Next.js 이미지 최적화 서버가 동시 처리 과부하
- 해결: img 태그 + loading="lazy" + WebP 변환으로 근본 해결

### 브라우저 캐시 문제
- 증상: 새 이미지 파일을 넣어도 기존 이미지가 표시됨
- 해결: .next 캐시 삭제 (rmdir /s /q .next) 후 재시작

## 현재 상태
- 버전: v0.9.7
- 총 멤버: 163명
- 카드 이미지 보유: 36명 (고정멤버) + default 1개
- 이미지 포맷: WebP (원본 PNG 보존)
- 배포: Vercel 자동 배포
