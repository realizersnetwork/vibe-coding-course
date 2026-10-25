# IA — HobbyFind

## 1. 사이트맵
- `/` 홈
- `/category/sports|intelligence|art`
- `/login` `/signup`
- `/mypage` (로그인 필요)
- `/docs-terms` 이용약관

## 2. 사용자 흐름
- 비회원: 홈 탐색 → 필터/검색 → 카테고리 페이지 → 북마크 시 로그인
- 회원: 로그인/소셜 로그인 → 북마크 토글 → 마이페이지 통계

## 3. 내비게이션
Top Bar: 로고, 운동형/지능형/예술형, 비회원=로그인·회원가입, 회원=마이페이지·로그아웃

## 4. 페이지 계층
홈(Hero + 필터 + 카드) / 카테고리(소개 + 카드) / 로그인·회원가입 폼 / 마이페이지(통계 + 목록)

## 5. 콘텐츠
카드: 이름, 썸네일, 설명, 북마크 버튼

## 6. 상호작용
카테고리 이동, 검색, 북마크 토글, 로그인 에러, 세션에 따른 상단바 변화

## 7. URL
`/`, `/login`, `/signup`, `/mypage`, `/category/sports|intelligence|art`

## 8. 컴포넌트
TopBar, HobbyCard, 통계 막대, 북마크 버튼

## 9. 상단바
로고, 카테고리, 인증 버튼. 하단바 없음.

## 10. 스택
Next.js, NextAuth, Supabase
