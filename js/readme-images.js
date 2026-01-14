/**
 * README Images Language Switcher
 * 
 * Switches images between English and Chinese versions based on current language.
 * Image URLs are pre-populated in HTML via data-img-en and data-img-zh attributes.
 * These attributes are auto-updated by GitHub Actions when README.md changes.
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

        if (!enSrc) return; // No data attributes, skip

        const targetSrc = lang === 'zh' ? (zhSrc || enSrc) : enSrc;

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
     * Updates all images with data attributes
     */
    function updateAllImages() {
        // Update hero image
        const heroImg = document.querySelector(`.${HERO_IMAGE_CLASS}`);
        if (heroImg) {
            updateImageForLanguage(heroImg);
        }

        // Update gallery images
        const gallery = document.getElementById(GALLERY_CONTAINER_ID);
        if (gallery) {
            gallery.querySelectorAll('img[data-img-en]').forEach(updateImageForLanguage);
        }

        console.log(`Images updated for ${getCurrentLanguage().toUpperCase()} language`);
    }

    /**
     * Initialize
     */
    function init() {
        // Update images on page load (in case language was previously set)
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
