class LanguageManager {
    constructor() {
        // Priority: saved preference > browser language > default 'en'
        const savedLang = localStorage.getItem('epic_video_finder_lang');
        const browserLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
        this.currentLang = savedLang || browserLang;
        this.init();
    }

    init() {
        // Set initial state
        this.setLanguage(this.currentLang);

        // Add event listener for toggle button if it exists
        document.addEventListener('DOMContentLoaded', () => {
            const toggleBtn = document.getElementById('lang-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    const newLang = this.currentLang === 'en' ? 'zh' : 'en';
                    this.setLanguage(newLang);
                });
                this.updateToggleButton();
            }
        });
    }

    setLanguage(lang) {
        if (!translations[lang]) return;

        this.currentLang = lang;
        localStorage.setItem('epic_video_finder_lang', lang);
        document.documentElement.lang = lang;

        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // Handle HTML content if needed (for <br> tags)
                if (element.tagName === 'H1' || translations[lang][key].includes('<br>')) {
                    element.innerHTML = translations[lang][key];
                    // Re-trigger SplitText animation if it's the H1
                    if (element.tagName === 'H1' && window.SplitTextAnimation) {
                        // Small timeout to let DOM update
                        setTimeout(() => window.SplitTextAnimation.init(), 50);
                    }
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Update Version Badge specifically as it has dynamic content
        if (window.updateVersionBadgeText) {
            window.updateVersionBadgeText();
        }

        // Update Toggle Button Text
        this.updateToggleButton();

        // Dispatch event for other scripts
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    updateToggleButton() {
        const toggleBtn = document.getElementById('lang-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = this.currentLang === 'en' ? 'EN' : '中文';
            toggleBtn.title = this.currentLang === 'en' ? 'Current: English' : 'Current: Chinese';
        }
    }
}

const languageManager = new LanguageManager();
