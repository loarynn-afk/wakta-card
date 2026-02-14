# Wakta-Card 배포 가이드

> 최종 업데이트: 2026-02-15

---

## 1. 로컬 개발 환경

### 1.1 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn
- Git

### 1.2 프로젝트 설치

```bash
cd C:\Users\good day\Desktop\wakta-card\wakta-card-next
npm install
```

### 1.3 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속. 파일 수정 시 자동으로 반영된다 (Hot Reload).

---

## 2. 배포 전 테스트 절차

### 2.1 프로덕션 빌드 테스트

```bash
# 빌드 실행 (이미지 최적화 + Next.js 빌드)
npm run build

# 프로덕션 모드로 로컬 실행
npm run start
```

`http://localhost:3000` 에서 실제 배포될 상태를 확인한다.

### 2.2 체크리스트

- [ ] 모든 카테고리 탭이 정상 작동하는지
- [ ] 검색 기능이 동작하는지
- [ ] 카드 이미지(WebP)가 정상 로딩되는지
- [ ] 모바일 반응형이 올바른지 (브라우저 개발자 도구 > 모바일 뷰)
- [ ] SNS 링크(YouTube, SOOP)가 정상 열리는지
- [ ] 콘솔에 에러가 없는지

---

## 3. 보안 점검 (배포 전 필수)

Git push 전에 반드시 아래 항목을 확인한다.

### 3.1 확인 항목

```bash
# .env 파일이 .gitignore에 포함되어 있는지
cat .gitignore | findstr ".env"

# 민감한 파일이 Git 추적에 포함되지 않았는지
git status

# API 키, 비밀번호 등이 코드에 없는지
findstr /s /i "password\|secret\|api_key\|token\|private" src\*.ts src\*.tsx
```

### 3.2 .gitignore 필수 항목

```
.env*
node_modules/
.next/
.vercel
waktaverse_url_input*
sheet2_url_input*
```

---

## 4. Git Push 및 자동 배포

### 4.1 커밋 및 푸시

```bash
# 1. 변경사항 확인
git status

# 2. 스테이징
git add .

# 3. 커밋 (커밋 메시지 규칙 준수)
git commit -m "feat: 기능설명"

# 4. 버전 태그 (필요 시)
git tag -a v0.10.0 -m "태그 설명"

# 5. 푸시 (Vercel 자동 배포 트리거)
git push
git push origin v0.10.0   # 태그도 함께 푸시
```

### 4.2 커밋 메시지 규칙

| 접두사 | 용도 |
|--------|------|
| feat: | 새 기능 추가 |
| fix: | 버그 수정 |
| style: | 디자인/CSS 변경 |
| refactor: | 코드 구조 개선 |
| docs: | 문서 수정 |
| chore: | 설정, 빌드 관련 |

---

## 5. Vercel 배포 (자동)

### 5.1 동작 방식

GitHub main 브랜치에 push하면 Vercel이 자동으로 감지하여 배포한다.

```
git push → GitHub → Vercel 감지 → 빌드(npm run build) → 배포 완료
```

### 5.2 Vercel 대시보드에서 확인

1. https://vercel.com 로그인
2. 해당 프로젝트 선택
3. Deployments 탭에서 빌드 상태 확인
4. 빌드 성공 시 자동으로 프로덕션 URL에 반영

### 5.3 배포 실패 시

1. Vercel 대시보드에서 빌드 로그 확인
2. 로컬에서 `npm run build`로 동일 에러 재현
3. 에러 수정 후 다시 push

---

## 6. Vercel 최초 설정 (신규 프로젝트일 경우)

### 6.1 GitHub 저장소 연결

1. https://vercel.com 에서 "New Project" 클릭
2. GitHub 계정 연동 후 wakta-card 저장소 선택
3. Framework Preset: **Next.js** 선택
4. Root Directory: 그대로 두거나 프로젝트 폴더 지정
5. "Deploy" 클릭

### 6.2 환경 변수 설정

현재 프로젝트는 환경 변수를 사용하지 않으므로 별도 설정 불필요.
향후 Firebase 등 외부 서비스 연동 시 Vercel 대시보드 > Settings > Environment Variables에서 추가.

### 6.3 도메인 설정 (선택)

1. Vercel 대시보드 > Settings > Domains
2. 커스텀 도메인 추가 가능
3. 기본 제공 도메인: `프로젝트명.vercel.app`

---

## 7. 배포 워크플로우 요약

```
1. 코드 수정
    ↓
2. 로컬 빌드 테스트 (npm run build)
    ↓
3. 보안 점검 (민감 정보 확인)
    ↓
4. git add . → git commit → git tag (선택)
    ↓
5. git push (Vercel 자동 배포)
    ↓
6. Vercel 대시보드에서 배포 상태 확인
    ↓
7. 프로덕션 URL에서 최종 확인
    ↓
8. md 폴더에 세션 로그 업데이트
```

---

## 8. 유용한 명령어 모음

```bash
# 개발 서버
npm run dev

# 이미지 최적화만 실행
npm run optimize

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm run start

# 린트 검사
npm run lint

# Git 상태 확인
git status
git log --oneline -10

# Git 태그 목록
git tag
```
