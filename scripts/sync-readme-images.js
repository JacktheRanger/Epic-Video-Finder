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
        gallery: []  // Array of { en: url, zh: url }
    };

    // Pattern to match: <!-- marker --> followed by <img ... src="url" ... />
    // Handles optional whitespace and newlines between comment and img tag
    const markerPattern = /<!--\s*(hero|gallery-(\d+))-(en|zh)\s*-->\s*<img[^>]+src="([^"]+)"/gi;

    let match;
    while ((match = markerPattern.exec(readmeContent)) !== null) {
        const type = match[1];      // "hero" or "gallery-N"
        const galleryNum = match[2]; // N (only for gallery), undefined for hero
        const lang = match[3];       // "en" or "zh"
        const url = match[4];        // The image URL

        if (type === 'hero') {
            images.hero[lang] = url;
        } else {
            // gallery-N (1-indexed in marker, convert to 0-indexed array)
            const index = parseInt(galleryNum) - 1;
            if (!images.gallery[index]) {
                images.gallery[index] = { en: null, zh: null };
            }
            images.gallery[index][lang] = url;
        }
    }

    // Filter out any undefined gallery entries (in case of gaps like gallery-1, gallery-3)
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
    if (images.hero.en) {
        const heroRegex = /<img([^>]*class="app-screenshot[^"]*"[^>]*)>/;
        const heroMatch = updated.match(heroRegex);

        if (heroMatch) {
            const oldTag = heroMatch[0];
            let newTag = oldTag;

            // Update src with English image (default)
            newTag = newTag.replace(/src="[^"]*"/, `src="${images.hero.en}"`);

            // Add or update data-img-en
            if (newTag.includes('data-img-en=')) {
                newTag = newTag.replace(/data-img-en="[^"]*"/, `data-img-en="${images.hero.en}"`);
            } else {
                newTag = newTag.replace(/>$/, ` data-img-en="${images.hero.en}">`);
            }

            // Add or update data-img-zh
            const zhHeroImg = images.hero.zh || images.hero.en;
            if (newTag.includes('data-img-zh=')) {
                newTag = newTag.replace(/data-img-zh="[^"]*"/, `data-img-zh="${zhHeroImg}"`);
            } else {
                newTag = newTag.replace(/>$/, ` data-img-zh="${zhHeroImg}">`);
            }

            if (oldTag !== newTag) {
                updated = updated.replace(oldTag, newTag);
                changes.push('Hero image updated');
            }
        }
    }

    // Update Gallery images
    if (images.gallery.length > 0) {
        // Build gallery HTML
        let galleryHtml = '\n';
        images.gallery.forEach((item, index) => {
            const enUrl = item.en || item.zh;  // Fallback to zh if en missing
            const zhUrl = item.zh || item.en;  // Fallback to en if zh missing
            if (enUrl) {
                galleryHtml += `                <div class="gallery-item">
                    <img src="${enUrl}" alt="Screenshot ${index + 1}" data-img-en="${enUrl}" data-img-zh="${zhUrl}">
                </div>\n`;
            }
        });
        galleryHtml += '            ';

        // Replace gallery content
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

    // Read files
    const readmeContent = fs.readFileSync(README_PATH, 'utf8');
    const indexContent = fs.readFileSync(INDEX_PATH, 'utf8');

    // Extract images
    const images = extractImages(readmeContent);

    console.log('📸 Found images:');
    console.log(`   Hero EN: ${images.hero.en ? '✓' : '✗'}`);
    console.log(`   Hero ZH: ${images.hero.zh ? '✓' : '✗'}`);
    console.log(`   Gallery: ${images.gallery.length} image pairs\n`);

    if (!images.hero.en && images.gallery.length === 0) {
        console.log('⚠️  No marked images found in README.');
        console.log('   Make sure to use markers like:');
        console.log('   <!-- hero-en -->');
        console.log('   <!-- gallery-1-en -->');
        process.exit(0);
    }

    // Update index.html
    const { content: newContent, changes } = updateIndexHtml(indexContent, images);

    if (changes.length === 0) {
        console.log('✅ No changes needed - index.html is already up to date.');
        process.exit(0);
    }

    // Write updated content
    fs.writeFileSync(INDEX_PATH, newContent, 'utf8');

    console.log('✅ Updated index.html:');
    changes.forEach(change => console.log(`   - ${change}`));

    // Output image URLs for verification
    console.log('\n📷 Image URLs:');
    console.log('   Hero EN:', images.hero.en || '(not set)');
    console.log('   Hero ZH:', images.hero.zh || '(using EN)');
    images.gallery.forEach((item, i) => {
        console.log(`   Gallery ${i + 1} EN:`, item.en || '(not set)');
        console.log(`   Gallery ${i + 1} ZH:`, item.zh || '(using EN)');
    });
}

main();
