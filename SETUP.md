# 재접속 후 직접 해야 하는 권한 설정

코드와 화면은 이미 만들어 두었습니다.  
아래는 **본인 계정으로만 할 수 있는 일**입니다.

## 1. GitHub (완료됨)

- 로그인 계정: `realizersnetwork`
- 이 저장소를 원격에 연결한 뒤 push 하면 됩니다.

## 2. Vercel 배포 (과제마다 1회)

1. https://vercel.com 로그인 (GitHub `realizersnetwork` 연동)
2. Add New → Project → 이 저장소 Import
3. **Root Directory**를 해당 앱 폴더로 지정  
   예: `apps/04-instagram`
4. Deploy
5. 환경변수가 있는 과제(11, 13, 14번)는 Production URL을 `NEXTAUTH_URL`에 넣고 재배포

## 3. Supabase (Step 5, 파이널)

1. https://supabase.com 프로젝트 생성 (Region: Seoul)
2. Project Settings → API
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Project Settings → API Keys → `service_role` → `SUPABASE_SERVICE_ROLE_KEY`
4. SQL Editor에서 각 앱 `supabase/schema.sql` 실행
5. Authentication → Providers에서 Email 활성화
6. 카카오 로그인이 필요하면 Kakao provider에 REST API 키/시크릿 입력

앱 폴더의 `.env.example`을 복사해 `.env.local`을 만들고 값을 넣습니다.

```bash
cp apps/14-hobbyfind/.env.example apps/14-hobbyfind/.env.local
```

Vercel → Settings → Environment Variables에도 같은 키를 넣습니다.  
`NEXTAUTH_URL`은 로컬은 `http://localhost:3000`, 배포는 Vercel 주소입니다.

`NEXTAUTH_SECRET` 생성:

```bash
openssl rand -base64 32
```

## 4. 카카오 로그인 (Step 5)

1. https://developers.kakao.com 앱 생성
2. Redirect URI: `http://localhost:3000/api/auth/callback/kakao`  
   배포 후 Vercel 주소도 추가
3. REST API 키 / Client Secret을 `.env.local`에 입력

## 5. Step 6–7 (런칭/수익) — 선택, 키만 꽂으면 동작

| 도구 | 넣을 곳 | 값 |
| --- | --- | --- |
| Google Analytics | `.env.local` `NEXT_PUBLIC_GA_ID` | G-xxxxxxxx |
| Microsoft Clarity | `NEXT_PUBLIC_CLARITY_ID` | 프로젝트 ID |
| 채널톡 | `NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY` | 플러그인 키 |
| Sentry | `SENTRY_DSN` | DSN |
| BetterStack | `BETTERSTACK_API_KEY` | API 키 |
| Google AdSense | `NEXT_PUBLIC_ADSENSE_CLIENT` | ca-pub-xxxx |

개인정보처리방침 / 이용약관 / 오픈소스 라이선스 초안은 `apps/14-hobbyfind/docs/`에 있습니다.  
사업자 정보·이메일만 본인 것으로 바꾸면 됩니다.

## 6. 파이널 제출 체크

- 중급 선택 시: 배포 URL에서 **회원가입부터** 다시 테스트
- GitHub ZIP (Code → Download ZIP) + Vercel URL
- `.env` / `.env.local`은 ZIP에 넣지 말 것
- 제출은 **1회만**, 마감 23:59:59, zip 아니면 0점
