/**
 * README Images Language Switcher
 * 
 * Switches images between English and Chinese versions based on current language.
 * Image URLs are pre-populated in HTML via data-img-en and data-img-zh attributes.
 * These attributes are auto-updated by GitHub Actions when README.md changes.
 * 
 * Gallery items can be language-specific using data-visible-en and data-visible-zh.
 */

(function () {
    const HERO_IMAGE_CLASS = 'app-screenshot';
    const GALLERY_CONTAINER_ID = 'readme-gallery';

    /**
     * Gets current language from localStorage or defaults to 'en'
     */
    function getCurrentLanguage() {
        return localStorage.getItem('epic_video_finder_lang') || 'en';
    }

    /**
     * Updates image src based on current language using data attributes
     */
    function updateImageForLanguage(img) {
        const lang = getCurrentLanguage();
        const enSrc = img.dataset.imgEn;
        const zhSrc = img.dataset.imgZh;

        // Determine target source based on language
        // If current language src is empty, fallback to other language
        let targetSrc;
        if (lang === 'zh') {
            targetSrc = zhSrc || enSrc;
        } else {
            targetSrc = enSrc || zhSrc;
        }

        if (!targetSrc) return; // No source available

        if (img.src !== targetSrc) {
            // Fade transition for hero image
            if (img.classList.contains(HERO_IMAGE_CLASS)) {
                img.classList.add('fade-out');
                setTimeout(() => {
                    img.src = targetSrc;
                    img.classList.remove('fade-out');
                }, 300);
            } else {
                img.src = targetSrc;
            }
        }
    }

    /**
     * Updates gallery item visibility based on current language
     */
    function updateGalleryVisibility() {
        const lang = getCurrentLanguage();
        const gallery = document.getElementById(GALLERY_CONTAINER_ID);

        if (!gallery) return;

        const items = gallery.querySelectorAll('.gallery-item');
        const visibleItems = [];

        items.forEach(item => {
            // Remove center-last class first
            item.classList.remove('center-last');

            const visibleEn = item.dataset.visibleEn;
            const visibleZh = item.dataset.visibleZh;

            // If visibility attributes exist, use them
            if (visibleEn !== undefined || visibleZh !== undefined) {
                const isVisibleForLang = lang === 'zh'
                    ? visibleZh === 'true'
                    : visibleEn === 'true';

                item.style.display = isVisibleForLang ? '' : 'none';
                if (isVisibleForLang) {
                    visibleItems.push(item);
                }
            } else {
                // If no visibility attributes, always show (backward compatible)
                visibleItems.push(item);
            }
        });

        // Center the last item if odd number of visible items
        if (visibleItems.length % 2 === 1 && visibleItems.length > 0) {
            visibleItems[visibleItems.length - 1].classList.add('center-last');
        }
    }

    /**
     * Updates all images with data attributes
     */
    function updateAllImages() {
        const lang = getCurrentLanguage();

        // Update hero image
        const heroImg = document.querySelector(`.${HERO_IMAGE_CLASS}`);
        if (heroImg) {
            updateImageForLanguage(heroImg);
        }

        // Update gallery visibility first
        updateGalleryVisibility();

        // Update gallery images
        const gallery = document.getElementById(GALLERY_CONTAINER_ID);
        if (gallery) {
            gallery.querySelectorAll('img[data-img-en], img[data-img-zh]').forEach(updateImageForLanguage);
        }

        console.log(`Images updated for ${lang.toUpperCase()} language`);
    }

    /**
     * Initialize
     */
    function init() {
        // Update images on page load
        updateAllImages();

        // Listen for language changes
        window.addEventListener('languageChanged', updateAllImages);
    }

    // Expose for external calls
    window.updateReadmeGallery = updateAllImages;

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
