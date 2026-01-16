/**
 * sync-readme-images.js
 * 
 * Parses README.md to extract image URLs using HTML comment markers
 * and updates index.html with the latest image URLs.
 * 
 * Supported markers:
 *   <!-- hero-en -->     - Hero image (English)
 *   <!-- hero-zh -->     - Hero image (Chinese)
 *   <!-- gallery-N-en --> - Gallery image N (English)
 *   <!-- gallery-N-zh --> - Gallery image N (Chinese)
 * 
 * Strict mode: Images only appear for their marked language.
 * 
 * Run: node scripts/sync-readme-images.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const ROOT_DIR = path.join(__dirname, '..');
const README_PATH = path.join(ROOT_DIR, 'README.md');
const INDEX_PATH = path.join(ROOT_DIR, 'index.html');

/**
 * Extract image URLs from README content using HTML comment markers
 */
function extractImages(readmeContent) {
    const images = {
        hero: { en: null, zh: null },
        gallery: []  // Array of { en: url|null, zh: url|null }
    };

    // Pattern to match: <!-- marker --> followed by <img ... src="url" ... />
    const markerPattern = /<!--\s*(hero|gallery-(\d+))-(en|zh)\s*-->\s*<img[^>]+src="([^"]+)"/gi;

    let match;
    while ((match = markerPattern.exec(readmeContent)) !== null) {
        const type = match[1];       // "hero" or "gallery-N"
        const galleryNum = match[2]; // N (only for gallery), undefined for hero
        const lang = match[3];       // "en" or "zh"
        const url = match[4];        // The image URL

        if (type === 'hero') {
            images.hero[lang] = url;
        } else {
            const index = parseInt(galleryNum) - 1;
            if (!images.gallery[index]) {
                images.gallery[index] = { en: null, zh: null };
            }
            images.gallery[index][lang] = url;
        }
    }

    // Filter out undefined entries
    images.gallery = images.gallery.filter(item => item !== undefined);

    return images;
}

/**
 * Update index.html with new image URLs
 */
function updateIndexHtml(indexContent, images) {
    let updated = indexContent;
    let changes = [];

    // Update Hero image
    if (images.hero.en || images.hero.zh) {
        const heroRegex = /<img([^>]*class="app-screenshot[^"]*"[^>]*)>/;
        const heroMatch = updated.match(heroRegex);

        if (heroMatch) {
            const oldTag = heroMatch[0];
            let newTag = oldTag;

            // Use EN as default src, or ZH if EN not available
            const defaultSrc = images.hero.en || images.hero.zh;
            newTag = newTag.replace(/src="[^"]*"/, `src="${defaultSrc}"`);

            // Set data-img-en (empty string if not available)
            if (newTag.includes('data-img-en=')) {
                newTag = newTag.replace(/data-img-en="[^"]*"/, `data-img-en="${images.hero.en || ''}"`);
            } else {
                newTag = newTag.replace(/>$/, ` data-img-en="${images.hero.en || ''}">`);
            }

            // Set data-img-zh (empty string if not available)
            if (newTag.includes('data-img-zh=')) {
                newTag = newTag.replace(/data-img-zh="[^"]*"/, `data-img-zh="${images.hero.zh || ''}"`);
            } else {
                newTag = newTag.replace(/>$/, ` data-img-zh="${images.hero.zh || ''}">`);
            }

            if (oldTag !== newTag) {
                updated = updated.replace(oldTag, newTag);
                changes.push('Hero image updated');
            }
        }
    }

    // Update Gallery images
    if (images.gallery.length > 0) {
        let galleryHtml = '\n';
        images.gallery.forEach((item, index) => {
            // Determine visibility: only show for languages that have this image
            const hasEn = !!item.en;
            const hasZh = !!item.zh;

            // Use available URL for src (prefer EN)
            const srcUrl = item.en || item.zh;

            if (srcUrl) {
                galleryHtml += `                <div class="gallery-item" data-visible-en="${hasEn}" data-visible-zh="${hasZh}">
                    <img src="${srcUrl}" alt="Screenshot ${index + 1}" data-img-en="${item.en || ''}" data-img-zh="${item.zh || ''}">
                </div>\n`;
            }
        });
        galleryHtml += '            ';

        const galleryReplaced = updated.replace(
            /<div id="readme-gallery"([^>]*class="gallery-grid"[^>]*)>[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
            `<div id="readme-gallery"$1>${galleryHtml}</div>
        </div>
    </section>`
        );

        if (galleryReplaced !== updated) {
            updated = galleryReplaced;
            changes.push(`Gallery updated with ${images.gallery.length} images`);
        }
    }

    return { content: updated, changes };
}

/**
 * Main function
 */
function main() {
    console.log('🔄 Syncing README images to index.html...\n');

    const readmeContent = fs.readFileSync(README_PATH, 'utf8');
    const indexContent = fs.readFileSync(INDEX_PATH, 'utf8');

    const images = extractImages(readmeContent);

    console.log('📸 Found images:');
    console.log(`   Hero EN: ${images.hero.en ? '✓' : '✗'}`);
    console.log(`   Hero ZH: ${images.hero.zh ? '✓' : '✗'}`);
    console.log(`   Gallery: ${images.gallery.length} items`);
    images.gallery.forEach((item, i) => {
        const enStatus = item.en ? '✓' : '✗';
        const zhStatus = item.zh ? '✓' : '✗';
        console.log(`     [${i + 1}] EN:${enStatus} ZH:${zhStatus}`);
    });
    console.log('');

    if (!images.hero.en && !images.hero.zh && images.gallery.length === 0) {
        console.log('⚠️  No marked images found in README.');
        process.exit(0);
    }

    const { content: newContent, changes } = updateIndexHtml(indexContent, images);

    if (changes.length === 0) {
        console.log('✅ No changes needed - index.html is already up to date.');
        process.exit(0);
    }

    fs.writeFileSync(INDEX_PATH, newContent, 'utf8');

    console.log('✅ Updated index.html:');
    changes.forEach(change => console.log(`   - ${change}`));
}

main();
