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
    const updateBadge = (version) => {
        // Ensure version starts with 'V' or 'v' if it's just a number, though usually tags have it.
        // If the tag is like "v1.0.0", we use it as is.
        // If the tag is "1.0.0", we might want to prepend "V".
        let displayVersion = version;
        if (!displayVersion.toLowerCase().startsWith('v')) {
            displayVersion = 'V' + displayVersion;
        }
        // Capitalize the first letter if it checks out (v -> V) for consistency with design
        if (displayVersion.startsWith('v')) {
            displayVersion = 'V' + displayVersion.substring(1);
        }

        badgeElement.textContent = `${displayVersion} Available Now`;
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
