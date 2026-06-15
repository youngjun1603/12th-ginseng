/* ============================================================
   i18n.js — 언어 전환 (KR / 中文)
   방식: 텍스트 노드 워킹 — HTML 구조 변경 없이 텍스트만 교체
   ============================================================ */
(function () {
  'use strict';

  var translations = {};

  /* 모든 텍스트 노드를 순회해 번역 적용 */
  function applyTranslations(t) {
    if (!t || !Object.keys(t).length) return;

    var walker = document.createTreeWalker(
      document.body, NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          var p = node.parentElement;
          if (!p) return NodeFilter.FILTER_REJECT;
          var tag = p.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA') {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (node) {
      var raw = node.textContent;
      var trimmed = raw.trim();
      if (trimmed && t[trimmed] !== undefined) {
        node.textContent = raw.replace(trimmed, t[trimmed]);
      }
    });

    /* placeholder 속성 교체 */
    document.querySelectorAll('[placeholder]').forEach(function (el) {
      var v = t[el.placeholder];
      if (v !== undefined) el.placeholder = v;
    });

    /* aria-label 교체 */
    document.querySelectorAll('[aria-label]').forEach(function (el) {
      var orig = el.getAttribute('aria-label');
      if (orig && t[orig] !== undefined) el.setAttribute('aria-label', t[orig]);
    });

    /* title 속성 교체 */
    document.querySelectorAll('[title]').forEach(function (el) {
      var orig = el.getAttribute('title');
      if (orig && t[orig] !== undefined) el.setAttribute('title', t[orig]);
    });

    /* document.title */
    var dt = document.title;
    if (t[dt] !== undefined) document.title = t[dt];
  }

  /* 버튼 active 상태 업데이트 */
  function updateButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  /* 언어 전환 (전역 노출) */
  window.setLang = function (lang) {
    localStorage.setItem('jinbonsam_lang', lang);
    var url = new URL(location.href);
    if (lang === 'ko') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    location.href = url.toString();
  };

  /* 초기화 */
  document.addEventListener('DOMContentLoaded', function () {
    var params = new URLSearchParams(location.search);
    var stored = localStorage.getItem('jinbonsam_lang');
    var lang = params.get('lang') || stored || 'ko';

    updateButtons(lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'ko';

    if (lang === 'ko') return;

    fetch('/lang/' + lang + '.json')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        translations = data;
        applyTranslations(translations);
      })
      .catch(function (e) {
        console.warn('i18n: could not load', lang, e);
      });
  });
})();
