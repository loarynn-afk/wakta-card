# 세션 로그 - 2026-02-15

## 변경 사항

### 1. 아키텍처 문서 및 배포 가이드 추가
- md/ARCHITECTURE.md: 전체 프로젝트 아키텍처 문서
- md/DEPLOY_GUIDE.md: 배포 절차 가이드

### 2. 카드 그리드 6열 → 7열 변경 (A안 적용)
- 사이트 전체 최대 너비 1400px → 1600px 확대
- 카드 크기(200x320px)와 간격(25px)은 유지

**수정 파일:**
- src/components/Header.tsx — max-w 1600px
- src/components/Footer.tsx — max-w 1600px
- src/app/members/page.tsx — 검색바 + 메인 컨텐츠 max-w 1600px
