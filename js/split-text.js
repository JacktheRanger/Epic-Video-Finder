
/**
 * SplitText Animation - Vanilla JS Implementation
 * Replicates the effect of splitting text into characters and animating them in.
 * Handles nested <br> tags and ensures High DPI text rendering.
 * NOW WITH PER-CHARACTER GRADIENT INTERPOLATION for beautiful colors!
 */
document.addEventListener('DOMContentLoaded', () => {
    // console.log('SplitText: Script loaded');
    const target = document.querySelector('h1');
    if (!target) {
        // console.error('SplitText: H1 target not found');
        return;
    }

    // Configuration for Gradient
    // Primary: #6366f1 (99, 102, 241)
    // Secondary: #ec4899 (236, 72, 153)
    const startColor = { r: 99, g: 102, b: 241 };
    const endColor = { r: 236, g: 72, b: 153 };

    const lerp = (start, end, t) => Math.round(start + (end - start) * t);
    const rgbToHex = (r, g, b) => `rgb(${r}, ${g}, ${b})`;

    try {
        const splitText = (element) => {
            const nodes = Array.from(element.childNodes);
            let charIndex = 0;
            // Calculate total characters for gradient distribution
            let totalChars = 0;
            nodes.forEach(node => {
                if (node.nodeType === 3) totalChars += node.textContent.length;
            });
            // Avoid divide by zero
            if (totalChars === 0) totalChars = 1;

            const newContent = document.createDocumentFragment();

            nodes.forEach(node => {
                if (node.nodeType === 3) { // Text node
                    const text = node.textContent;

                    for (let i = 0; i < text.length; i++) {
                        const char = text[i];
                        if (char === '\n' || char === '\r') continue;

                        const span = document.createElement('span');

                        if (char === ' ') {
                            span.innerHTML = '&nbsp;';
                            span.classList.add('split-char', 'space');
                        } else {
                            span.textContent = char;
                            span.classList.add('split-char');
                        }

                        // Calculate Gradient Color
                        // t goes from 0 to 1 across the whole string
                        const t = charIndex / (totalChars - 1 || 1);
                        const r = lerp(startColor.r, endColor.r, t);
                        const g = lerp(startColor.g, endColor.g, t);
                        const b = lerp(startColor.b, endColor.b, t);

                        span.style.color = rgbToHex(r, g, b);

                        // Set CSS variable for delay
                        span.style.setProperty('--char-index', charIndex);

                        newContent.appendChild(span);
                        charIndex++;
                    }
                } else if (node.nodeType === 1) { // Element node (e.g., <br>)
                    const clone = node.cloneNode(true);
                    newContent.appendChild(clone);
                }
            });

            // Safety clear
            element.innerHTML = '';
            element.appendChild(newContent);

            // Force reflow/paint before adding class
            setTimeout(() => {
                element.classList.add('animate-split-text');
            }, 50);
        };

        // Apply strict hardware acceleration hints
        target.style.willChange = 'transform, opacity';

        splitText(target);

    } catch (e) {
        // console.error('SplitText: Error executing split', e);
    }
});
