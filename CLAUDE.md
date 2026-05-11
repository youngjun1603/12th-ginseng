# 復元 · 12年 — 프로젝트 컨텍스트

## 프로젝트 개요
12년근 비배양 산양산삼 발효 드링크 **復元 · 12年** 홍보용 랜딩 페이지.
- 네이버 스마트스토어 연결 예정 (아직 미등록)
- 홈페이지 콘텐츠 = 네이버 스토어 상품 설명 이미지로도 활용 예정
- 제품 촬영 미완료 → 현재 placeholder 사용 중

## 배포
- **도메인**: https://jinbonsam.com/ ✅ 확정
- **GitHub Pages (레거시)**: https://youngjun1603.github.io/12th-ginseng/
- 작업 후 반드시 `cp 산양산삼_Landing_Page_fixed.html index.html` → `git push`

## 파일 구조
| 파일 | 역할 |
|------|------|
| `산양산삼_Landing_Page_fixed.html` | 마스터 소스 (항상 여기서 편집) |
| `index.html` | GitHub Pages 진입점 (마스터 복사본) |
| `og-image.html` | OG 이미지 생성용 1200×630 디자인 + PNG 저장 버튼 |
| `og-image.svg` | 현재 사용 중인 브랜드 OG 이미지 (카카오톡 공유용) |
| `sitemap.xml` | 검색엔진 색인용 사이트맵 |
| `robots.txt` | 크롤러 허용 + sitemap 포인터 |
| `images/` | 실제 제품 사진 저장 폴더 |
| `images/README.md` | 이미지 파일명 규칙 안내 |

## 이미지 파일명 규칙 (`images/` 폴더)
| 파일명 | 용도 | 권장 크기 |
|--------|------|-----------|
| `product-main.jpg` | 제품 대표 사진 (세로형) | 900×1125px |
| `ingredient.jpg` | 산양산삼 원료 근접 | 700×450px |
| `lifestyle.jpg` | 라이프스타일 컷 | 700×450px |
| `process.jpg` | 구증구포 발효 공정 (전폭 배너) | 1400×500px |
| `compound-k.jpg` | Compound-K 흡수 인포그래픽 | 800×450px |

사진 추가 방법: 파일 저장 후 해당 슬롯 div 안에
`<img src="images/파일명.jpg" alt="설명" class="img-fill">` 추가 → git push

## 디자인 토큰 (CSS 변수)
```css
/* Green */
--g-900: #0D1A0D   /* 가장 어두운 배경 */
--g-800: #142414   /* primary dark */
--g-700: #1C3A1C

/* Gold */
--gold: #C4993A    /* primary gold */
--gold-light: #D4A94A
--gold-darker: #7A5818

/* Cream / Black */
--cr: #F8F4EC      /* 기본 밝은 텍스트 */
--bk: #0A0E0A
```

## 주요 상수 (index.html 하단 스크립트)
```js
const STORE_URL      = 'https://smartstore.naver.com/STORE_ID'; // 스토어 등록 후 교체
const SITE_URL       = 'https://jinbonsam.com/'; // ✅ 도메인 확정
const KAKAO_APP_KEY  = 'YOUR_KAKAO_APP_KEY'; // developers.kakao.com 에서 발급
```
- `STORE_URL` — `.store-link` 클래스 버튼 전체 자동 업데이트
- `KAKAO_APP_KEY` — 카카오톡 공유 기능 (Hero, Footer, Floating CTA 3곳)

## SEO 현황
| 항목 | 상태 |
|------|------|
| `<title>` + `<meta description>` | ✅ 완료 |
| Open Graph + Twitter Card | ✅ 완료 |
| `<link rel="canonical">` | ✅ 완료 |
| JSON-LD (Product + FAQPage + Organization + WebSite) | ✅ 완료 |
| `sitemap.xml` + `robots.txt` | ✅ 완료 |
| 폰트 preconnect 최적화 | ✅ 완료 |
| OG 이미지 (카카오 공유 썸네일) | ✅ `og-image.svg` 적용 중 |
| GA4 측정 ID | ⏳ `G-XXXXXXXXXX` 교체 필요 |
| 네이버 서치어드바이저 인증 | ⏳ jinbonsam.com 등록 필요 |
| 구글 서치콘솔 등록 | ⏳ jinbonsam.com 등록 필요 |

## 마케팅 채널 연동 현황
| 채널 | 상태 |
|------|------|
| 카카오톡 공유 버튼 | ✅ 구현 (App Key 교체 필요) |
| URL 복사 + 토스트 | ✅ 구현 |
| Footer SNS 아이콘 (카카오·인스타·네이버블로그) | ✅ 구현 (각 채널 URL 교체 필요) |
| 네이버 전환 추적 스크립트 | ⏳ 주석 처리 — 광고 집행 시 활성화 |
| 인스타그램(메타) 픽셀 | ⏳ 주석 처리 — 광고 집행 시 활성화 |

## OG 이미지 PNG 업그레이드 방법
현재 SVG → PNG로 교체하면 모든 플랫폼 호환성 향상
1. `og-image.html`을 브라우저에서 열기
2. 우측 상단 **"PNG 저장"** 버튼 클릭 → `og-image.png` 자동 다운로드
3. `12th-ginseng/` 폴더에 복사 후 `git push`
4. `index.html` og:image / twitter:image URL을 `og-image.svg` → `og-image.png` 교체

## 섹션 구조 (순서)
| ID | 레이블 | 배경 |
|----|--------|------|
| `#photos` | 01-C Photos | dark |
| `#problem` | 02 Problem | cream |
| `#solution` | 03 Solution | dark |
| `#process` | 04 Process | cream |
| `#science` | 05 Science | cream |
| `#compound-k` | 05-B Compound-K | dark |
| `#compare` | 06 Compare | cream-2 |
| `#target` | 06-B Target | bk |
| `#why` | 06-C Why Premium | cream-2 |
| `#pricing` | 07 Pricing | dark |
| `#reviews` | 08 Reviews | cream |
| `#faq` | 09 FAQ | cream-2 |

## 대기 중인 작업
- [ ] GA4 측정 ID 발급 → `G-XXXXXXXXXX` 2곳 교체
- [ ] 카카오 App Key 발급 → `KAKAO_APP_KEY` 교체 (developers.kakao.com)
- [ ] 네이버 스마트스토어 등록 → `STORE_URL` 업데이트
- [ ] 제품 사진 촬영 → `images/` 폴더에 5종 저장
- [x] 도메인 등록 → jinbonsam.com ✅ URL 일괄 교체 완료
- [ ] 구글 서치콘솔 등록 (jinbonsam.com)
- [ ] 네이버 서치어드바이저 등록 (jinbonsam.com)
- [ ] OG 이미지 PNG 저장 → `og-image.png` push + og:image URL 교체
- [ ] Footer SNS 링크 href 교체 (인스타그램, 네이버 블로그 채널 개설 후)

## 기술 스택
- 순수 HTML/CSS/JS (빌드 도구 없음)
- Google Fonts: Noto Serif KR + Noto Sans KR (preconnect 최적화)
- IntersectionObserver: 스크롤 reveal 애니메이션 + floating CTA 표시
- Google Analytics 4 (gtag.js)
- 카카오 JavaScript SDK (공유 기능)
- html2canvas (og-image.html PNG 저장용)
