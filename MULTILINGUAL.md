# 진본삼 산삼명작 — 다국어(i18n) 구현 가이드

> 최종 업데이트: 2026-06-27  
> 대상 파일: `산양산삼_Landing_Page_fixed.html` (마스터), `index.html` (배포본), `archive.html`, `products.html`

---

## 1. 번역 경로 3가지 — 구조 개요

이 프로젝트는 **순수 HTML/CSS/JS 단일 파일** 구조로, 외부 i18n 라이브러리 없이 3가지 번역 경로를 사용합니다.

```
사용자가 언어 선택
       │
       ├─── 한국어(ko)    → 기본 상태 (lang="ko")
       │
       ├─── 중국어(zh)    → i18n.js 자체 렌더링
       │                    html[lang="zh-CN"] CSS 훅
       │                    URL: ?lang=zh
       │
       └─── 기타 18개 언어 → Google Translate 위젯
                             html.gt-active CSS 훅
                             googtrans 쿠키로 상태 유지
```

추가로, **브라우저 자체 번역**(Chrome·Firefox)도 감지합니다:

```
Chrome/Firefox 번역 버튼 클릭
       │
       └─── MutationObserver 감지 (translated-ltr/rtl 클래스)
                → html.translated-active 클래스 추가
                → GT 위젯과 동일한 오버플로우 수정 적용
                   (단, nav 위치 이동 없음 — 배너가 없으므로)
```

---

## 2. CSS 훅 — 어떤 클래스에 어떤 규칙을 걸어야 하는가

| CSS 훅 | 언제 활성화 | 사용 용도 |
|--------|-----------|---------|
| `html.gt-active` | Google Translate 위젯 사용 시 JS가 추가 | nav 위치 이동 + 오버플로우 수정 전체 |
| `html.translated-active` | Chrome/Firefox 내장 번역 시 MutationObserver가 추가 | 오버플로우 수정만 (nav 이동 없음) |
| `html[lang="zh-CN"]` | 사이트 언어 선택기에서 중국어 선택 시 | 자체 i18n 스타일 조정 (폰트·letter-spacing 등) |

### 오버플로우 수정 — GT + 브라우저 내장번역 동시 적용 패턴

```css
/* GT 위젯 + 브라우저 내장번역 모두 커버 */
:is(html.gt-active, html.translated-active) .some-element {
  word-break: break-word;
  overflow-wrap: anywhere;
}
```

### nav 위치 이동 — GT 위젯 전용 (브라우저 내장번역 제외)

```css
/* GT 배너(상단 바) 만큼 nav를 아래로 밀기 */
html.gt-active .nav { top: 45px !important }    /* CSS fallback */
/* → JS 폴러가 실제 높이로 덮어씀 (아래 JS 섹션 참고) */
```

### 히어로 패딩 — --gt-bar-h 변수 사용 (하드코딩 금지)

```css
/* ❌ 하드코딩 금지 */
html.gt-active .hero { padding-top: calc(var(--nav-h) + 77px) }

/* ✅ CSS 변수 사용 — JS 폴러가 실제 배너 높이로 업데이트 */
html.gt-active .hero { padding-top: calc(var(--nav-h) + var(--gt-bar-h, 45px) + 32px) }
/* ≤960px */ html.gt-active .hero { padding-top: calc(var(--nav-h) + var(--gt-bar-h, 45px) + 10px) }
/* ≤560px */ html.gt-active .hero { padding-top: calc(var(--nav-h) + var(--gt-bar-h, 45px) + 4px)  }
```

`--gt-bar-h` fallback 값(45px)은 GT 배너 기본 높이. JS가 실제 측정값으로 덮어씁니다.

---

## 3. JS 구조

### 3-1. 언어 메타데이터

```js
var LANG_META = {
  ko: { code: 'kr', label: 'KR' },
  zh: { code: 'cn', label: '中' },
  en: { code: 'us', label: 'EN' },
  ja: { code: 'jp', label: '日' },
  vi: { code: 'vn', label: 'VI' },
  id: { code: 'id', label: 'ID' },
  th: { code: 'th', label: 'TH' },
  hi: { code: 'in', label: 'HI' },
  ar: { code: 'sa', label: 'AR' },
  de: { code: 'de', label: 'DE' },
  fr: { code: 'fr', label: 'FR' },
  it: { code: 'it', label: 'IT' },
  es: { code: 'es', label: 'ES' },
  pt: { code: 'br', label: 'PT' },
  nl: { code: 'nl', label: 'NL' },
  pl: { code: 'pl', label: 'PL' },
  tr: { code: 'tr', label: 'TR' },
  ru: { code: 'ru', label: 'RU' }
};
// code = flagcdn.com의 ISO 국가 코드 (국기 이미지용)
// label = nav 버튼에 표시되는 짧은 텍스트
```

### 3-2. 언어 선택 흐름

```js
function selectLang(lang) {
  clearGTCookies();             // 항상 기존 GT 쿠키 먼저 삭제
  
  if (lang === 'ko') {
    // 한국어: 기본 상태로 복귀
    localStorage.setItem('jinbonsam_lang', 'ko');
    // ?lang 파라미터 제거 후 리로드
    
  } else if (lang === 'zh') {
    // 중국어: URL 파라미터 방식 (?lang=zh)
    // → i18n.js(또는 인라인 스크립트)가 html[lang="zh-CN"] 설정
    localStorage.setItem('jinbonsam_lang', 'zh');
    // ?lang=zh 추가 후 리로드
    
  } else {
    // 기타 언어: Google Translate 위젯 방식
    // → googtrans=/ko/{lang} 쿠키 설정 후 리로드
    // → GT 위젯이 페이지 번역 + .goog-te-banner-frame 표시
    document.cookie = 'googtrans=/ko/' + lang + '; path=/';
    document.cookie = 'googtrans=/ko/' + lang + '; path=/; domain=.jinbonsam.com';
  }
}
```

> **주의:** 쿠키는 `path=/`와 `path=/; domain=.jinbonsam.com` **두 곳에 모두** 설정/삭제해야 합니다. 하나만 하면 서브도메인에서 쿠키가 남아 번역이 해제되지 않습니다.

### 3-3. GT 위젯 활성화 감지 + nav 높이 폴링

```js
if (getGTCookieLang()) {
  // 즉시 클래스 추가 (CSS 적용을 위해 폴링 전에)
  document.documentElement.classList.add('gt-active');
  
  // GT 배너 실제 높이 폴링 (200ms 간격, 최대 8초)
  var _gt = 0, _gtid = setInterval(function() {
    var b = document.querySelector('.goog-te-banner-frame');
    var n = document.querySelector('.nav');
    if (b && n && b.offsetHeight > 0) {
      n.style.top = b.offsetHeight + 'px';                                       // nav 이동
      document.documentElement.style.setProperty('--gt-bar-h', b.offsetHeight + 'px'); // CSS변수 업데이트
      clearInterval(_gtid);
    }
    if (++_gt > 40) clearInterval(_gtid); // 8초 타임아웃
  }, 200);
}
```

### 3-4. Chrome/Firefox 브라우저 내장번역 감지

```js
(function() {
  var h = document.documentElement;
  function check() {
    if (h.classList.contains('translated-ltr') || h.classList.contains('translated-rtl')) {
      h.classList.add('translated-active');
      obs.disconnect();
    }
  }
  var obs = new MutationObserver(check);
  obs.observe(h, { attributes: true, attributeFilter: ['class'] });
  check(); // 이미 번역된 상태로 로드됐을 경우 즉시 체크
})();
```

---

## 4. 주요 CSS 규칙 — 번역 시 발생하는 레이아웃 버그 수정

번역 엔진은 텍스트를 `<font>` 태그로 감싸거나, 문자 수가 늘어나 레이아웃을 깹니다.

### 4-1. font 태그 인라인화 (GT 필수)

```css
html.gt-active font, html.translated-active font {
  display: inline !important;    /* GT가 block으로 바꾸는 것 방지 */
  max-width: 100%;
  word-break: break-word;
  overflow-wrap: anywhere;
}
```

### 4-2. 섹션 텍스트 줄바꿈

```css
:is(html.gt-active, html.translated-active) .section-inner p,
:is(html.gt-active, html.translated-active) .section-inner h2,
:is(html.gt-active, html.translated-active) .section-inner h3,
:is(html.gt-active, html.translated-active) .section-inner h4,
:is(html.gt-active, html.translated-active) .section-inner li {
  word-break: break-word;
  overflow-wrap: anywhere;
}
```

### 4-3. 비교표 테이블 고정 레이아웃

```css
:is(html.gt-active, html.translated-active) .cmp { table-layout: fixed }
:is(html.gt-active, html.translated-active) .cmp th,
:is(html.gt-active, html.translated-active) .cmp td {
  word-break: break-word;
  white-space: normal;    /* nowrap 해제 */
}
```

### 4-4. 모바일 — 히어로 섹션 (중요)

```css
@media (max-width: 960px) {
  /* 2컬럼 그리드를 1컬럼으로 강제 (우측 밀림의 근본 원인) */
  html.gt-active .hero-inner,
  html[lang="zh-CN"] .hero-inner {
    grid-template-columns: 1fr !important;
  }
  
  /* 이미지 컨테이너 full-bleed 복원 */
  html.gt-active .hero-bottle-wrap,
  html[lang="zh-CN"] .hero-bottle-wrap {
    order: -1 !important;          /* 이미지를 텍스트 위로 */
    min-height: unset !important;
    overflow: hidden !important;
  }
  
  /* ⚠️ 히어로 h1은 .hero-title이 아니라 .hero-h1 / .hero-sub */
  html.gt-active .hero-h1, html.gt-active .hero-sub,
  html.translated-active .hero-h1, html.translated-active .hero-sub,
  html[lang="zh-CN"] .hero-h1, html[lang="zh-CN"] .hero-sub {
    word-break: break-word;
    overflow-wrap: anywhere;
  }
}
```

### 4-5. 모바일 — nav 로고 2줄 방지

```css
@media (max-width: 960px) {
  :is(html.gt-active, html.translated-active) .nav-logo {
    font-size: 13px !important;
    letter-spacing: .02em !important;
    flex-shrink: 1;
    min-width: 0;
    max-width: calc(100vw - 160px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
```

### 4-6. 모바일 — STEP 카드 2컬럼→1컬럼

```css
@media (max-width: 960px) {
  :is(html.gt-active, html.translated-active) .tl-grid {
    grid-template-columns: 1fr !important;  /* 일본어 등 긴 번역 텍스트 대비 */
  }
}
```

### 4-7. Why 섹션 플렉스 아이템 축소

```css
:is(html.gt-active, html.translated-active) .why-body {
  min-width: 0;       /* flex 기본값 min-width:auto 해제 */
  overflow: hidden;
}
```

---

## 5. 새 언어 추가 방법

### 5-1. Google Translate 방식 (대부분의 언어)

1. **`LANG_META` 객체에 항목 추가**

```js
var LANG_META = {
  /* 기존 항목들 ... */
  ko_new: { code: '국가ISO코드', label: '표시텍스트' }
  //         ↑ flagcdn.com 코드  ↑ 버튼에 표시될 짧은 이름
};
```

2. **데스크탑 드롭다운에 버튼 추가** (`#langMenu` 안)

```html
<button class="lang-item" data-lang="xx" onclick="selectLang('xx')">
  <img class="lang-flag" src="https://flagcdn.com/20x15/xx.png" alt="XX" width="20" height="15">
  언어명
</button>
```

3. **모바일 드로어에도 동일하게 추가** (`#mobLangRow` 안, `closeMobNav()` 함께 호출)

```html
<button class="lang-item" data-lang="xx"
  onclick="selectLang('xx');closeMobNav()"
  style="justify-content:center;flex:1;min-width:90px;border:1px solid rgba(196,153,58,.2)">
  <img class="lang-flag" src="https://flagcdn.com/20x15/xx.png" alt="XX" width="20" height="15">
  언어명
</button>
```

4. **`selectLang()` 함수 수정 불필요** — Google Translate 경로는 자동 처리됨

---

### 5-2. 자체 i18n 방식 (중국어처럼 자체 번역 텍스트 제공 시)

현재 중국어만 자체 i18n 방식을 사용합니다. 추가 언어를 같은 방식으로 구현하려면:

1. `selectLang()`에 분기 추가

```js
} else if (lang === 'ja-native') {
  localStorage.setItem('jinbonsam_lang', 'ja-native');
  u.searchParams.set('lang', 'ja-native');
  location.href = u.toString();
}
```

2. 페이지 로드 시 언어 감지 후 `document.documentElement.lang = 'ja'` 설정

3. CSS 훅 추가

```css
html[lang="ja"] .some-element { /* 일본어 전용 스타일 */ }
```

---

## 6. 알려진 한계 및 주의사항

### ⚠️ Safari 내장 번역 미감지

Safari의 자체 번역 기능은 `translated-ltr` 클래스를 추가하지 않습니다. 현재 구현으로는 감지 불가능합니다. Safari 사용자는 Google Translate 위젯을 직접 사용해야 레이아웃 수정이 적용됩니다.

### ⚠️ 히어로 클래스명 주의

```
❌ .hero-title   — 이 클래스는 존재하지 않음 (과거 데드 셀렉터 버그 이력 있음)
✅ .hero-h1      — 히어로 메인 h1 태그
✅ .hero-sub     — 히어로 서브타이틀 p 태그
```

GT/번역 관련 CSS를 히어로 섹션에 추가할 때 반드시 `.hero-h1`, `.hero-sub`를 사용하세요.

### ⚠️ archive.html / products.html 별도 관리

`index.html`과 별개로, `archive.html`과 `products.html`도 **독립적인 GT CSS 블록**을 가집니다. 메인 파일의 GT CSS를 수정할 때 두 파일도 함께 확인하세요.

두 파일에 필요한 GT 규칙:
- `html.gt-active font { ... word-break ... overflow-wrap ... }`
- `html.gt-active .foot-bizinfo { flex-wrap: wrap }`
- `html.gt-active .page-header h1, p { word-break ... }`
- `@media ≤960px { html.gt-active .nav-logo { ... } }`

메인 파일의 섹션별 규칙(`.sol-item`, `.sci-card`, `.tl-grid` 등)은 두 파일에는 없어도 됩니다 (해당 섹션이 없으므로).

### ⚠️ 쿠키 삭제 두 곳 필수

```js
// 반드시 두 줄 모두 실행
document.cookie = 'googtrans=; max-age=0; path=/';
document.cookie = 'googtrans=; max-age=0; path=/; domain=.jinbonsam.com';
```

도메인 없이 한 줄만 삭제하면 `jinbonsam.com` 도메인 쿠키가 잔존해 번역이 해제되지 않습니다.

### ⚠️ `overflow-x: hidden` body 기본 적용

`html, body { overflow-x: hidden }` 이 이미 base CSS에 적용되어 있습니다. GT 전용으로 `html.gt-active body { overflow-x: hidden }`을 따로 추가하면 중복이 됩니다 (삭제된 이력 있음, 재추가 금지).

---

## 7. GT 관련 Google 부가 UI 숨김

```css
/* GT가 추가하는 불필요한 UI 요소 전체 숨김 (번역 바 제외) */
.goog-te-gadget,
#goog-gt-tt,
.goog-tooltip,
.goog-te-balloon-frame { display: none !important }
```

---

## 8. 지원 언어 현황 (2026-06-27)

| 언어 | 코드 | 방식 | 우선순위 |
|------|------|------|---------|
| 한국어 | `ko` | 기본 | — |
| 중국어(간체) | `zh` | i18n.js | 1차 ✅ |
| 영어 | `en` | Google Translate | 1차 ✅ |
| 일본어 | `ja` | Google Translate | 2차 ✅ |
| 베트남어 | `vi` | Google Translate | — |
| 인도네시아어 | `id` | Google Translate | — |
| 태국어 | `th` | Google Translate | — |
| 힌디어 | `hi` | Google Translate | — |
| 아랍어 | `ar` | Google Translate | — |
| 독일어 | `de` | Google Translate | 3차 |
| 프랑스어 | `fr` | Google Translate | 3차 |
| 이탈리아어 | `it` | Google Translate | 3차 |
| 스페인어 | `es` | Google Translate | 3차 |
| 포르투갈어 | `pt` | Google Translate | 3차 |
| 네덜란드어 | `nl` | Google Translate | — |
| 폴란드어 | `pl` | Google Translate | — |
| 터키어 | `tr` | Google Translate | — |
| 러시아어 | `ru` | Google Translate | — |

---

## 9. 한방 용어 번역 주의 (번역기 오역 다발)

| 한국어 | 영어 | 중국어 |
|--------|------|--------|
| 산양산삼 | Wild-simulated mountain ginseng | 山养山参 |
| 구증구포 | Nine-steam nine-dry process | 九蒸九曝 |
| 발효흑산삼 | Fermented black mountain ginseng | 发酵黑山参 |
| 컴파운드K | Compound-K | 化合物K |
| 초미세분말 | Ultra-fine powder | 超微细粉末 |
| 비배양 | Non-cultivated | 非培养 |

Google Translate가 이 용어들을 잘못 번역할 수 있습니다. 중요 언어(영어·중국어·일본어)는 최종 게시 전 원어민 검수를 권장합니다.
