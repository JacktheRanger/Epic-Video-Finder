/**
 * README Images Auto-Fetcher
 * Automatically fetches and displays images from the project's README.md
 * Shows English or Chinese screenshots based on current language setting
 * 
 * Image distribution:
 * - 1st image: Hero/App Showcase section
 * - 2nd & 3rd images: Gallery section ("See it in action")
 */

(function () {
    const GITHUB_REPO = 'JacktheRanger/Epic-Video-Finder';
    const README_RAW_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/README.md`;

    // Container IDs
    const HERO_IMAGE_CLASS = 'app-screenshot';
    const GALLERY_CONTAINER_ID = 'readme-gallery';

    // Cache for parsed images
    let cachedImages = {
        en: [],
        zh: []
    };

    /**
     * Fetches README content and extracts image URLs by language section
     */
    async function fetchReadmeImages() {
        try {
            const response = await fetch(README_RAW_URL);
            if (!response.ok) {
                throw new Error(`Failed to fetch README: ${response.status}`);
            }

            const readmeContent = await response.text();

            // Split content by language sections
            // English section: from start to "## 中文"
            // Chinese section: from "## 中文" to end
            const chineseSectionIndex = readmeContent.indexOf('## 中文');

            let englishSection = readmeContent;
            let chineseSection = '';

            if (chineseSectionIndex !== -1) {
                englishSection = readmeContent.substring(0, chineseSectionIndex);
                chineseSection = readmeContent.substring(chineseSectionIndex);
            }

            // Extract GitHub user-attachments image URLs from each section
            const imageRegex = /https:\/\/github\.com\/user-attachments\/assets\/[a-f0-9-]+/gi;

            const englishMatches = englishSection.match(imageRegex) || [];
            const chineseMatches = chineseSection.match(imageRegex) || [];

            // Store unique images for each language
            cachedImages.en = [...new Set(englishMatches)];
            cachedImages.zh = [...new Set(chineseMatches)];

            console.log(`Found ${cachedImages.en.length} English images and ${cachedImages.zh.length} Chinese images in README.md`);

            return cachedImages;
        } catch (error) {
            console.error('Error fetching README images:', error);
            return { en: [], zh: [] };
        }
    }

    /**
     * Creates gallery item HTML for an image
     */
    function createGalleryItem(imageUrl, index) {
        const div = document.createElement('div');
        div.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Screenshot ${index + 1}`;
        img.loading = 'lazy'; // Lazy load for performance

        div.appendChild(img);
        return div;
    }

    /**
     * Gets current language from localStorage or defaults to 'en'
     */
    function getCurrentLanguage() {
        return localStorage.getItem('epic_video_finder_lang') || 'en';
    }

    /**
     * Updates the hero showcase image (1st image)
     */
    function updateHeroImage() {
        const heroImg = document.querySelector(`.${HERO_IMAGE_CLASS}`);
        if (!heroImg) {
            console.warn(`Hero image .${HERO_IMAGE_CLASS} not found`);
            return;
        }

        const lang = getCurrentLanguage();
        const images = cachedImages[lang] || cachedImages.en;

        if (images.length > 0) {
            heroImg.src = images[0];
            heroImg.alt = lang === 'zh' ? 'Epic Video Finder 界面' : 'Epic Video Finder Interface';
            console.log(`Updated hero image to ${lang.toUpperCase()} version`);
        }
    }

    /**
     * Renders gallery images (2nd & 3rd images only)
     */
    function renderGallery() {
        const container = document.getElementById(GALLERY_CONTAINER_ID);
        if (!container) {
            console.warn(`Gallery container #${GALLERY_CONTAINER_ID} not found`);
            return;
        }

        const lang = getCurrentLanguage();
        const images = cachedImages[lang] || cachedImages.en;

        // Get only 2nd and 3rd images (skip the 1st one used for hero)
        const galleryImages = images.slice(1);

        if (galleryImages.length === 0) {
            return;
        }

        // Clear existing content
        container.innerHTML = '';

        // Add each image to the gallery
        galleryImages.forEach((imageUrl, index) => {
            const galleryItem = createGalleryItem(imageUrl, index);
            container.appendChild(galleryItem);
        });

        console.log(`Rendered ${galleryImages.length} ${lang.toUpperCase()} images in gallery`);
    }

    /**
     * Updates all images based on current language
     */
    function updateAllImages() {
        updateHeroImage();
        renderGallery();
    }

    /**
     * Initialize: fetch and display README images
     */
    async function init() {
        await fetchReadmeImages();
        updateAllImages();

        // Listen for language changes (triggered by language-manager.js)
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
