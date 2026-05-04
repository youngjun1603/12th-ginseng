# 復元 · 12年 — 프로젝트 컨텍스트

## 프로젝트 개요
12년근 비배양 산양산삼 발효 드링크 **復元 · 12年** 홍보용 랜딩 페이지.
- 네이버 스마트스토어 연결 예정 (아직 미등록)
- 홈페이지 콘텐츠 = 네이버 스토어 상품 설명 이미지로도 활용 예정
- 제품 촬영 미완료 → 현재 placeholder 사용 중

## 배포
- **GitHub Pages**: https://youngjun1603.github.io/12th-ginseng/
- 작업 후 반드시 `cp 산양산삼_Landing_Page_fixed.html index.html` → `git push`
- Cloudflare 별도 설정 불필요 (GitHub Pages로 충분)

## 파일 구조
| 파일 | 역할 |
|------|------|
| `산양산삼_Landing_Page_fixed.html` | 마스터 소스 (항상 여기서 편집) |
| `index.html` | GitHub Pages 진입점 (마스터 복사본) |
| `og-image.html` | OG 이미지 생성용 1200×630 디자인 |
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

이미지 저장 시 `onerror` 처리로 placeholder가 자동으로 숨겨지고 실제 사진이 표시됨.

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

## 주요 패턴
### 네이버 스토어 링크 일괄 변경
```js
// index.html 하단 스크립트에서 한 줄만 변경
const STORE_URL = 'https://smartstore.naver.com/STORE_ID';
```
`.store-link` 클래스가 붙은 모든 버튼이 자동 업데이트됨.

### GA4 측정 ID 교체
`G-XXXXXXXXXX` → 실제 ID로 파일 내 2곳 교체 (head 스크립트 블록).

### OG 이미지 교체
1. `og-image.html`을 브라우저에서 1200px 너비로 열기
2. 전체 스크린샷 → `og-image.png`로 저장
3. 같은 폴더에 넣고 git push
4. `index.html` og:image URL을 `https://youngjun1603.github.io/12th-ginseng/og-image.png`로 교체

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
- [ ] GA4 측정 ID 발급 후 `G-XXXXXXXXXX` 2곳 교체
- [ ] 네이버 스마트스토어 등록 후 `STORE_URL` 업데이트
- [ ] `og-image.html` 스크린샷 → `og-image.png` 저장 및 og:image URL 교체
- [ ] 제품 사진 촬영 후 `images/` 폴더에 저장 (5종)

## 기술 스택
- 순수 HTML/CSS/JS (빌드 도구 없음)
- Google Fonts: Noto Serif KR + Noto Sans KR
- IntersectionObserver: 스크롤 reveal 애니메이션 + floating CTA 표시
- Google Analytics 4 (gtag.js)
