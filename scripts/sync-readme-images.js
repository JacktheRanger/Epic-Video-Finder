/**
 * sync-readme-images.js
 * 
 * Parses README.md to extract GitHub user-attachment image URLs
 * and updates index.html with the latest image URLs.
 * 
 * Run: node scripts/sync-readme-images.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const ROOT_DIR = path.join(__dirname, '..');
const README_PATH = path.join(ROOT_DIR, 'README.md');
const INDEX_PATH = path.join(ROOT_DIR, 'index.html');

// Regex to find GitHub user-attachments image URLs
const IMAGE_REGEX = /https:\/\/github\.com\/user-attachments\/assets\/[a-f0-9-]+/gi;

/**
 * Extract image URLs from README content by language section
 */
function extractImages(readmeContent) {
    // Split by Chinese section marker
    const chineseSectionIndex = readmeContent.indexOf('## 中文');

    let englishSection = readmeContent;
    let chineseSection = '';

    if (chineseSectionIndex !== -1) {
        englishSection = readmeContent.substring(0, chineseSectionIndex);
        chineseSection = readmeContent.substring(chineseSectionIndex);
    }

    // Extract unique images from each section
    const englishImages = [...new Set(englishSection.match(IMAGE_REGEX) || [])];
    const chineseImages = [...new Set(chineseSection.match(IMAGE_REGEX) || [])];

    return { en: englishImages, zh: chineseImages };
}

/**
 * Update index.html with new image URLs
 */
function updateIndexHtml(indexContent, images) {
    let updated = indexContent;
    let changes = [];

    // Update Hero image (first image)
    // Pattern: <img ... class="app-screenshot floating" data-img-en="..." data-img-zh="...">
    const heroRegex = /<img([^>]*class="app-screenshot[^"]*"[^>]*)>/;
    const heroMatch = updated.match(heroRegex);

    if (heroMatch && images.en.length > 0) {
        const oldTag = heroMatch[0];
        let newTag = oldTag;

        // Update src with English image (default)
        newTag = newTag.replace(/src="[^"]*"/, `src="${images.en[0]}"`);

        // Add or update data-img-en
        if (newTag.includes('data-img-en=')) {
            newTag = newTag.replace(/data-img-en="[^"]*"/, `data-img-en="${images.en[0]}"`);
        } else {
            newTag = newTag.replace(/>$/, ` data-img-en="${images.en[0]}">`);
        }

        // Add or update data-img-zh
        const zhHeroImg = images.zh[0] || images.en[0];
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

    // Update Gallery images (2nd and 3rd images)
    // Pattern: <div id="readme-gallery" ...> containing gallery items
    const galleryRegex = /<div id="readme-gallery"[^>]*class="gallery-grid"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;
    const galleryMatch = updated.match(galleryRegex);

    if (images.en.length > 1) {
        const galleryImagesEn = images.en.slice(1);  // Skip first (hero)
        const galleryImagesZh = images.zh.slice(1);

        // Build gallery HTML
        let galleryHtml = '\n';
        galleryImagesEn.forEach((imgUrl, index) => {
            const zhUrl = galleryImagesZh[index] || imgUrl;
            galleryHtml += `                <div class="gallery-item">
                    <img src="${imgUrl}" alt="Screenshot ${index + 1}" data-img-en="${imgUrl}" data-img-zh="${zhUrl}">
                </div>\n`;
        });
        galleryHtml += '            ';

        // Replace gallery content
        updated = updated.replace(
            /<div id="readme-gallery"([^>]*class="gallery-grid"[^>]*)>[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
            `<div id="readme-gallery"$1>${galleryHtml}</div>
        </div>
    </section>`
        );
        changes.push(`Gallery updated with ${galleryImagesEn.length} images`);
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
    console.log(`📸 Found ${images.en.length} English images`);
    console.log(`📸 Found ${images.zh.length} Chinese images\n`);

    if (images.en.length === 0) {
        console.log('⚠️  No images found in README. Exiting.');
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
    console.log('   Hero EN:', images.en[0]);
    console.log('   Hero ZH:', images.zh[0] || '(same as EN)');
    if (images.en.length > 1) {
        console.log('   Gallery EN:', images.en.slice(1).length, 'images');
        console.log('   Gallery ZH:', images.zh.slice(1).length, 'images');
    }
}

main();
