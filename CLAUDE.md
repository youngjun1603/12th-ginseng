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
const KAKAO_APP_KEY  = '15a29c6b6d22bdeeb302efe709248e8a'; // ✅ 적용 완료
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
| OG 이미지 | ✅ `og-image.png` (1200×630) 적용 완료 |
| GA4 측정 ID | ⏳ `G-XXXXXXXXXX` 교체 필요 |
| 네이버 서치어드바이저 인증 | ⏳ jinbonsam.com 등록 필요 |
| 구글 서치콘솔 등록 | ⏳ jinbonsam.com 등록 필요 |

## 마케팅 채널 연동 현황
| 채널 | 상태 |
|------|------|
| 카카오톡 공유 버튼 | ✅ 정상 작동 (공유 + 링크 이동 모두 확인) |
| URL 복사 + 토스트 | ✅ 구현 |
| 네이버 공유 | ✅ 구현 |
| 인스타그램 공유 (Web Share API) | ✅ 구현 (미지원 시 URL 복사 fallback) |
| Footer SNS 아이콘 (카카오·인스타·네이버블로그) | ✅ 구현 (각 채널 URL 교체 필요) |
| 네이버 전환 추적 스크립트 | ⏳ 주석 처리 — 광고 집행 시 활성화 |
| 인스타그램(메타) 픽셀 | ⏳ 주석 처리 — 광고 집행 시 활성화 |

## OG 이미지
- `og-image.png` (1200×630) ✅ 배포 완료 — og:image, twitter:image 모두 적용
- 갱신 방법: `og-image.html` → "PNG 저장" 버튼 → `og-image.png` 덮어쓰기 → git push

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

## 2026-05-22 주요 변경 내역

### 콘텐츠·가격
- 산양산삼 **6뿌리 → 7뿌리**, **6g → 7g** 전체 교체
- 하루 비용 **8,200원 → 7,900원**
- 소비자가 **600,000원 → 660,000원** (전체)
- 프로젝트 할인가 **248,000원 → 237,000원** (전체)
- Why 섹션 01카드 원료 가치 **660,000원 → 약 3,500,000원**
- Pricing 섹션 "프리미엄" → **"진본삼 산삼명작 샷"**
- 자문교수 정승필 **"교수 역임"** 추가
- Sci 섹션 제목 **"단 한 병에 담긴 '진짜' 원료" → "진본삼 산삼명작의 '진짜' 원료"**

### 섹션·레이아웃
- **Business & Drinking** 타겟 카드 추가 (부모님↔Student 사이)
- Business & Drinking / Student 카드 **좌우 배치**로 변경
- **Trust bar** 1행 가로 → **3열×2행 그리드**로 변경
- 히어로+Trust bar **배경 통일(g-800)** 및 자연스럽게 연결
- **Pricing 카드 하단** 이메일 구독폼 + SNS 공유 아이콘 추가

### 이미지 교체 (모두 WebP로 최적화 완료)
| 슬롯 | 적용 이미지 | 원본 크기 |
|------|------------|-----------|
| 히어로 | `Gemini_Generated_Image_sjni7jsjni7jsjni.webp` | 656×1611 |
| Photos 슬롯1 | `Gemini_Generated_Image_jbdcjnjbdcjnjbdc.webp` | 896×1200 |
| Photos 슬롯2 | `KakaoTalk_20260522_175345255.webp` | 2528×1696→900px |
| Photos 슬롯3 | `KakaoTalk_20260522_180027296.webp` | 2528×1696→900px |
| Photos 슬롯4 | `Gemini_Generated_Image_rgqldwrgqldwrgql.webp` | 1589×672 |
| Solution | `KakaoTalk_20260522_184239689.webp` | 928×1152 |
| Compound-K 하단 | `KakaoTalk_20260522_204317681.webp` | 2754×1536→1400px |

**이미지 최적화**: PNG→WebP 변환 + 리사이즈로 **27MB → 662KB (97.5% 감소)**, 히어로 제외 `loading="lazy"` 적용

### UI·스타일 강조
- `target-tag`: 10.5px→13px, bold
- `price-feat-tag` ("대한민국 활력 프로젝트 특별가"): 10px→13px, bold
- 구매 버튼 텍스트 전체 → **"진본삼 산삼명작 구매하기"**
- Nav CTA **금색 → 녹색(#03C75A)**, nav-logo **18px→21px**
- Nav 메뉴 글자 **13px→15px**, bold
- 히어로 `accent` (진본삼 산삼명작 샷) 아래 **줄간격 확대**

### 모바일 최적화
- Nav `구매하기` 버튼 **960px 이하에서 숨김** (햄버거 메뉴로 대체)
- 모바일 드로어 메뉴 글자 **28px→20px** 축소
- "지금 구매하기" 버튼 **녹색**으로 통일
- 히어로 우측 세로 라인·세로 캡션 텍스트 **모바일 숨김**
- `photo-main-v2` 모바일 비율 **4/3→3/4** (상품 이미지 온전 노출)

---

## 대기 중인 작업
- [ ] GA4 측정 ID 발급 → `G-XXXXXXXXXX` 2곳 교체
- [ ] 네이버 스마트스토어 등록 → `STORE_URL` 업데이트
- [ ] 제품 사진 촬영 → `images/` 폴더에 5종 저장 (WebP로도 변환할 것)
- [x] 도메인 등록 → jinbonsam.com ✅
- [x] KAKAO_APP_KEY 발급 및 적용 ✅ (`15a29c6b6d22bdeeb302efe709248e8a`)
- [x] 카카오 공유 링크 이동 오류 수정 ✅ (제품 링크 관리 > 웹 도메인 등록)
- [x] OG 이미지 → `og-image.png` (1200×630) 적용 ✅
- [ ] 구글 서치콘솔 등록 (jinbonsam.com)
- [ ] 네이버 서치어드바이저 등록 (jinbonsam.com)
- [ ] Footer SNS 링크 href 교체 (인스타그램, 네이버 블로그 채널 개설 후)

## 다국어(i18n) 확장 계획

### 방식: JS 기반 i18n (확정)
- HTML에 `data-i18n` 속성 키만 남기고 텍스트는 JSON으로 분리
- 선택한 언어 JSON만 lazy load → 파일 크기 문제 없음
- 새 언어 추가 = `lang/xx.json` 파일 1개 + Nav 버튼 1개

### 파일 구조
```
12th-ginseng/
├── index.html        ← data-i18n 속성 추가 (HTML은 오히려 가벼워짐)
├── i18n.js           ← 언어 전환 로직 (~50줄)
└── lang/
    ├── ko.json       ← 한국어 (기준)
    ├── en.json       ← 영어
    ├── zh.json       ← 중국어
    ├── ja.json       ← (향후) 일본어
    ├── de.json       ← (향후) 독일어
    ├── fr.json       ← (향후) 프랑스어
    └── es.json       ← (향후) 스페인어
```

### URL 구조
- 한국어: `jinbonsam.com/`
- 영어: `jinbonsam.com/?lang=en`
- 중국어: `jinbonsam.com/?lang=zh`
- 선택 언어 `localStorage` 저장 → 재방문 시 유지
- SEO: `<link rel="alternate" hreflang>` 태그 추가

### 번역 대상 언어 및 우선순위
| 우선순위 | 언어 | 비고 |
|----------|------|------|
| 1차 | 영어 | 글로벌 공통 |
| 1차 | 중국어 간체 | 중국 본토 타겟 |
| 2차 | 일본어 | 한국 건강식품 수요 높음 |
| 3차 | 독일어·프랑스어·스페인어 | 유럽·중남미 |

### 핵심 번역 용어 (한방 용어 — 번역기 오역 주의)
| 한국어 | 영어 | 중국어 |
|--------|------|--------|
| 산양산삼 | Wild-simulated mountain ginseng | 山养山参 |
| 구증구포 | Nine-steam nine-dry process | 九蒸九曝 |
| 발효흑산삼 | Fermented black mountain ginseng | 发酵黑山参 |
| 컴파운드K | Compound-K | 化合物K |
| 초미세분말 | Ultra-fine powder | 超微细粉末 |
| 비배양 | Non-cultivated | 非培养 |

### 구현 시작 조건 (모두 충족 후 시작 권장)
- [ ] 한국어 콘텐츠 최종 확정 (가격·스토어 URL 포함)
- [ ] 중국어 간체 vs 번체 타겟 결정
- [ ] 해외 배송·결제 방식 확정
- [ ] 번역 후 원어민 검수 계획 수립 (특히 효능 표현 규제 확인)

### 주의사항
- 효능·의학 관련 문구는 현지 규제(FDA·중국 위생부 등)에 맞게 조정 필요
- 최종 게시 전 원어민 1회 검수 권장

---

## 카카오톡 공유 설정 (트러블슈팅 기록)

### 현재 구현
```js
Kakao.Share.sendDefault({
  objectType: 'feed',
  content: {
    title: '진본삼 산삼명작 샷 — 12년근 산양산삼',
    description: '배양근 0%. 12년근 산양산삼 7뿌리를...',
    imageUrl: SITE_URL + 'images/Gemini_Generated_Image_sjni7jsjni7jsjni.webp',
    imageWidth: 656, imageHeight: 1611,
    link: { mobileWebUrl: SITE_URL, webUrl: SITE_URL }
  },
  buttons: [{ title: '진본삼 산삼명작 샷에서 확인', link: { mobileWebUrl: SITE_URL, webUrl: SITE_URL } }]
});
```

### 카카오 개발자 콘솔 필수 설정 2가지 (혼동 주의)

| 항목 | 위치 | 용도 |
|------|------|------|
| JavaScript SDK 도메인 | 앱 > 플랫폼 키 > JavaScript 키 > JavaScript SDK 도메인 | Kakao.init() 허용 도메인 |
| **공유 링크 웹 도메인** | **앱 > 제품 링크 관리 > 웹 도메인** | 공유 메시지 내 URL 허용 도메인 |

→ **두 곳 모두** `https://jinbonsam.com` 등록 필요. 하나만 등록하면 공유는 되지만 클릭 시 이동 불가.

### 오류 이력 및 원인

| 증상 | 원인 | 해결 |
|------|------|------|
| 공유는 되나 클릭 시 아무 반응 없음 | **Error 4002**: 제품 링크 관리 > 웹 도메인 미등록 | developers.kakao.com > 앱 > 제품 링크 관리 > 웹 도메인에 `https://jinbonsam.com` 등록 |
| 카드 형식 없이 텍스트만 전송됨 | imageUrl 이미지가 200px 미만 (193px) | 200px 이상 이미지로 교체 |
| PC 카카오에서 "모바일에서 확인해주세요." | 정상 — PC 카카오의 기본 버튼 텍스트 | 해당 없음 |

### 이미지 최소 요건
- 최소 너비: **200px** (미달 시 카드 형식 렌더링 실패, 링크 제거됨)
- 권장: 600px 이상, 비율 1:1~2:1 (가로형)
- WebP 지원: ✅

## 기술 스택
- 순수 HTML/CSS/JS (빌드 도구 없음)
- Google Fonts: Noto Serif KR + Noto Sans KR (preconnect 최적화)
- IntersectionObserver: 스크롤 reveal 애니메이션 + floating CTA 표시
- Google Analytics 4 (gtag.js)
- 카카오 JavaScript SDK (공유 기능)
- html2canvas (og-image.html PNG 저장용)
