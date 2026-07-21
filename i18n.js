(function () {
  const STORAGE_KEY = "tabernacle-site-lang";
  const SUPPORTED = ["ko", "en", "ja"];

  const strings = {
    en: {
      brandBy: "by Tabernacle",
      eyebrow: "Official site",
      heroTitle: "Battle Rummy",
      heroLead:
        "A mobile rummy-style board game for solo AI practice and local Bluetooth battles.",
      heroSub:
        "Built for quick matches, clear rules, and play anytime with friends nearby.",
      aboutTitle: "Developer",
      companyLabel: "Company",
      companyValue: "Tabernacle (터버너클)",
      emailLabel: "Contact",
      footerCompany: "Company: Tabernacle (터버너클)",
      privacyLink: "Privacy Policy",
      documentTitle: "Battle Rummy — Tabernacle",
    },
    ko: {
      brandBy: "터버너클",
      eyebrow: "공식 사이트",
      heroTitle: "배틀 루미",
      heroLead:
        "AI 대국과 블루투스 근거리 대전을 지원하는 모바일 루미 스타일 보드게임입니다.",
      heroSub: "짧은 한 판, 명확한 규칙으로 언제든 친구와 함께 즐길 수 있습니다.",
      aboutTitle: "개발사",
      companyLabel: "회사명",
      companyValue: "터버너클 (Tabernacle)",
      emailLabel: "문의",
      footerCompany: "회사명: 터버너클 (Tabernacle)",
      privacyLink: "개인정보 처리방침",
      documentTitle: "배틀 루미 — 터버너클",
    },
    ja: {
      brandBy: "Tabernacle",
      eyebrow: "公式サイト",
      heroTitle: "Battle Rummy",
      heroLead:
        "AI対戦とBluetooth近距離対戦に対応した、モバイル向けラミースタイルのボードゲームです。",
      heroSub: "短い対局とわかりやすいルールで、いつでも近くの友達と遊べます。",
      aboutTitle: "開発者",
      companyLabel: "会社名",
      companyValue: "Tabernacle（ターバナクル）",
      emailLabel: "お問い合わせ",
      footerCompany: "会社名: Tabernacle（ターバナクル）",
      privacyLink: "プライバシーポリシー",
      documentTitle: "Battle Rummy — Tabernacle",
    },
  };

  function detectBrowserLang() {
    const candidates = [
      ...(navigator.languages || []),
      navigator.language,
      navigator.userLanguage,
    ].filter(Boolean);

    for (const raw of candidates) {
      const code = String(raw).toLowerCase();
      if (code.startsWith("ko")) return "ko";
      if (code.startsWith("ja")) return "ja";
    }
    return "en";
  }

  function resolveInitialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (_) {
      /* ignore */
    }
    return detectBrowserLang();
  }

  function applyLang(lang) {
    const dict = strings[lang] || strings.en;
    document.documentElement.lang = lang;
    document.title = dict.documentTitle;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && dict[key] != null) el.textContent = dict[key];
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const active = btn.getAttribute("data-lang") === lang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = "en";
    applyLang(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      /* ignore */
    }
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLang(btn.getAttribute("data-lang"));
    });
  });

  setLang(resolveInitialLang());
})();
