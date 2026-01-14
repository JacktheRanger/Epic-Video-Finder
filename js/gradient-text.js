/**
 * GradientText Animation
 * Activates after SplitText completes.
 * Renders a smooth, looping gradient across the text.
 */
document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector('h1');
    if (!target) return;

    // Configuration
    const config = {
        animationSpeed: 8.5, // seconds
        colors: ['#5227ff', '#ff9ffc', '#b19eef', '#9d2a2a', '#ffd700'],
        yoyo: false // false = continuous flow
    };

    target.addEventListener('split-text-complete', () => {
        // console.log('GradientText: Activating');

        // 1. Inject CSS styles dynamically
        // Zoom Strategy & Loop Fix:
        // To ensure a smooth loop without stutter, the gradient sequence must be seamless.
        // We append the first color to the end: [C1, C2, C3, C4, C5, C1].
        // This ensures the value at 100% (C1) matches the value at 0% (C1).
        // Size: 300% width (to maintain the zoomed-in look).
        // Animation:
        // We need to slide by exactly one full pattern length (300%).
        // With background-size: 300% (Image=3W, Container=1W), the leverage factor is 1W-3W = -2W.
        // background-position % P maps to Offset = -2W * (P/100).
        // We want Offset range of 3W (one full image width).
        // Range = 3W.
        // Delta P * |-2W| = 3W  =>  Delta P = 1.5 (150%).
        // So we animate from 150% to 0%.

        const loopColors = [...config.colors, config.colors[0]];
        const gradientColors = loopColors.join(', ');

        const styleId = 'gradient-text-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @keyframes gradient-flow {
                    0% { background-position: 150% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .gradient-text-active {
                    position: relative;
                    background-image: linear-gradient(to right, ${gradientColors});
                    background-size: 300% 100%;
                    animation: gradient-flow ${config.animationSpeed}s linear infinite;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    -webkit-text-fill-color: transparent;
                    /* Layout Fix: 
                     * Use block + fit-content to ensure it breaks the line (stays below badge)
                     * but still hugs the text for the gradient animation.
                     * margin-inline: auto keeps it centered.
                     */
                    display: block; 
                    width: fit-content;
                    margin-left: auto;
                    margin-right: auto;
                }
            `;
            document.head.appendChild(style);
        }

        // 2. DOM Flattening Strategy (The Nuclear Fix)
        // The SplitText spans often interfere with background-clip: text on the parent.
        // We will reconstruct the H1 content as plain text + BR tags.
        const childNodes = Array.from(target.childNodes);
        let newHtml = '';

        childNodes.forEach(node => {
            if (node.nodeName === 'BR') {
                newHtml += '<br>';
            } else if (node.nodeType === 3) { // Text node
                newHtml += node.textContent;
            } else if (node.tagName === 'SPAN' && node.classList.contains('split-char')) {
                // Recover character
                // Check if it's a space span
                if (node.classList.contains('space')) {
                    newHtml += ' ';
                } else {
                    newHtml += node.textContent;
                }
            } else {
                // Fallback for any other elements
                newHtml += node.outerHTML || node.textContent;
            }
        });

        // Apply new content and class
        target.innerHTML = newHtml;
        target.classList.add('gradient-text-active');
    });
});
