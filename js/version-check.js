/**
 * GitHub Latest Release Version Checker
 * Automatically updates the version badge based on the latest GitHub release.
 * Includes caching to avoid hitting GitHub API rate limits.
 */

document.addEventListener('DOMContentLoaded', () => {
    const REPO_OWNER = 'JacktheRanger';
    const REPO_NAME = 'Epic-Video-Finder';
    const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
    const CACHE_KEY_VERSION = 'epic_video_finder_version';
    const CACHE_KEY_TIMESTAMP = 'epic_video_finder_version_timestamp';
    const CACHE_DURATION = 3600 * 1000; // 1 hour in milliseconds

    const badgeElement = document.getElementById('version-badge');

    if (!badgeElement) {
        console.error('Version badge element not found');
        return;
    }

    // Function to update the badge text
    window.updateVersionBadgeText = () => {
        const currentLang = localStorage.getItem('epic_video_finder_lang') || 'en';
        const version = localStorage.getItem(CACHE_KEY_VERSION);
        if (!version) return; // Wait for fetch

        let displayVersion = version;
        if (!displayVersion.toLowerCase().startsWith('v')) {
            displayVersion = 'V' + displayVersion;
        }
        if (displayVersion.startsWith('v')) {
            displayVersion = 'V' + displayVersion.substring(1);
        }

        const availableText = currentLang === 'en' ? "Available Now" : "现已发布";
        // Also update the static text if it's the first load or fallback
        if (badgeElement) {
            badgeElement.textContent = `${displayVersion} ${availableText}`;
        }
    };

    const updateBadge = (version) => {
        // Just store version and call the main update function which handles language
        // We might need to store it in a way available to the window function if not using localStorage for the *exact* string passed here
        // But the logic below stores it in localStorage anyway.
        // So we can just call our new window function.
        // However, we need to ensure the version is stored before calling.
        // The original logic calls updateBadge then stores. 
        // Let's modify the usage sites.

        // Actually, let's just make updateBadge update the text directly using the current language
        const currentLang = localStorage.getItem('epic_video_finder_lang') || 'en';

        let displayVersion = version;
        if (!displayVersion.toLowerCase().startsWith('v')) {
            displayVersion = 'V' + displayVersion;
        }
        if (displayVersion.startsWith('v')) {
            displayVersion = 'V' + displayVersion.substring(1);
        }

        const availableText = translations && translations[currentLang] ? translations[currentLang]["hero.badge"] : "Available Now";
        badgeElement.textContent = `${displayVersion} ${availableText}`;
    };

    // Check cache first
    const cachedVersion = localStorage.getItem(CACHE_KEY_VERSION);
    const cachedTimestamp = localStorage.getItem(CACHE_KEY_TIMESTAMP);
    const now = Date.now();

    if (cachedVersion && cachedTimestamp && (now - parseInt(cachedTimestamp) < CACHE_DURATION)) {
        // Use cached version
        console.log('Using cached version:', cachedVersion);
        updateBadge(cachedVersion);
        return;
    }

    // Fetch from GitHub API
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const latestVersion = data.tag_name;
            if (latestVersion) {
                console.log('Fetched latest version:', latestVersion);
                // Update Cache
                localStorage.setItem(CACHE_KEY_VERSION, latestVersion);
                localStorage.setItem(CACHE_KEY_TIMESTAMP, now.toString());

                // Update UI
                updateBadge(latestVersion);
            }
        })
        .catch(error => {
            console.error('Failed to fetch version:', error);
            // Fallback: If cache exists (even if expired), use it as better than nothing?
            // Or just leave the static HTML default (which is "V3.6.0 Available Now").
            // Let's rely on the static HTML as the ultimate fallback.
            if (cachedVersion) {
                // If fetch failed (maybe offline), can still use old cache if available
                updateBadge(cachedVersion);
            }
        });
});
