# Git 버전 관리 가이드

## 1. 버전 번호 규칙 (Semantic Versioning)

버전은 `v주.부.패치` 형식으로 관리한다.

```
v1.2.3
│ │ └── 패치(patch): 버그 수정, 오타 수정 등 작은 변경
│ └──── 부(minor): 새 기능 추가 (기존 기능에 영향 없음)
└────── 주(major): 큰 구조 변경, 기존 기능이 바뀌는 경우
```

예시:
- v0.4.0 -> v0.4.1 : URL 오타 수정 (패치)
- v0.4.0 -> v0.5.0 : 가챠 시스템 추가 (부 버전)
- v0.9.0 -> v1.0.0 : 정식 출시 (주 버전)


## 2. 일상적인 작업 흐름

### 작업 -> 커밋 -> 푸시

```bash
# 1) 변경된 파일 확인
git status

# 2) 변경 사항 스테이징
git add .

# 3) 의미 있는 메시지로 커밋
git commit -m "feat: YouTube/SOOP URL 추가"

# 4) 원격 저장소에 푸시 (Vercel 자동 배포)
git push
```

### 커밋 메시지 작성 규칙

```
feat: 새 기능 추가
fix: 버그 수정
style: 디자인/CSS 변경
refactor: 코드 구조 개선 (기능 변경 없음)
docs: 문서 수정
chore: 설정 파일, 빌드 관련 변경
```

예시:
- `feat: 멤버 모달에 YouTube/SOOP 링크 연동`
- `fix: 모달 닫기 버튼 동작 안 되는 문제 수정`
- `style: 카드 호버 애니메이션 개선`


## 3. 버전 태그 만들기

중요한 시점마다 태그를 붙여둔다.

```bash
# 태그 생성
git tag -a v0.4.0 -m "YouTube/SOOP URL 연동 완료"

# 태그를 원격에 올리기
git push origin v0.4.0

# 모든 태그 확인
git tag

# 특정 태그의 상세 정보 확인
git show v0.4.0
```


## 4. 문제가 생겼을 때 대처법

### 상황 1: 방금 수정한 파일을 되돌리고 싶다 (아직 커밋 전)

```bash
# 특정 파일 하나만 원래대로
git checkout -- src/data/members.ts

# 모든 변경 사항 되돌리기
git checkout -- .
```

### 상황 2: 커밋을 했는데 되돌리고 싶다

```bash
# 직전 커밋 취소 (변경 내용은 유지, 다시 수정 가능)
git reset --soft HEAD~1

# 직전 커밋 취소 (변경 내용도 삭제, 완전히 이전 상태로)
git reset --hard HEAD~1
```

### 상황 3: 이미 push까지 했는데 되돌리고 싶다

```bash
# 되돌리는 새 커밋을 만든다 (가장 안전한 방법)
git revert HEAD
git push
```

### 상황 4: 특정 버전(태그)으로 돌아가고 싶다

```bash
# 해당 버전의 코드를 확인만 하기
git checkout v0.3.0

# 다시 최신으로 돌아오기
git checkout main

# 해당 버전으로 완전히 되돌리기 (주의: 이후 작업 사라짐)
git reset --hard v0.3.0
git push --force
```

### 상황 5: 실험적인 기능을 시도하고 싶다

브랜치를 만들어서 별도로 작업하면 메인 코드에 영향이 없다.

```bash
# 새 브랜치 만들고 이동
git checkout -b feature/gacha-system

# 작업 후 커밋
git add .
git commit -m "feat: 가챠 시스템 프로토타입"

# 성공했으면 메인에 합치기
git checkout main
git merge feature/gacha-system

# 실패했으면 브랜치만 삭제
git checkout main
git branch -d feature/gacha-system
```


## 5. 자주 쓰는 확인 명령어

```bash
# 현재 상태 확인 (변경된 파일 목록)
git status

# 커밋 히스토리 보기
git log --oneline

# 태그 목록 보기
git tag

# 특정 파일의 변경 내역 보기
git log --oneline src/data/members.ts

# 마지막 커밋과 현재의 차이 보기
git diff
```


## 6. 현재 프로젝트 버전 히스토리

| 버전 | 날짜 | 내용 |
|------|------|------|
| v0.4.0 | 2026-02-10 | YouTube/SOOP URL 연동, 이덕수 할아바이 이름 수정 |

(이후 작업마다 이 표를 업데이트할 것)
