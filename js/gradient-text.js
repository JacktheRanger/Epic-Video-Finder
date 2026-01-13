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
        // Zoom Strategy: To show fewer colors at once, we stretch the gradient even larger (600% width).
        // Gradient Content: [Colors, Colors] (Two full sets).
        // Each "Set" takes up 300% (half of 600%).
        // Visible Window: 100% (1/3 of a Set). So we see ~1/3 of the colors at once.
        // Loop Logic:
        // We need to shift background by exactly one Set length (300%).
        // Max Shift (from 100% to 0% pos) = BgSize(600) - WinSize(100) = 500%.
        // Target Shift = 300%.
        // Fraction P = 300 / 500 = 0.6.
        // So we animate across a 60% range of the background-position capability, e.g., 80% -> 20%.
        // 80% Pos leads to Offset = 500% * 0.8 = 400% (Start of 2nd set + 100% into it).
        // 20% Pos leads to Offset = 500% * 0.2 = 100% (Start of 1st set + 100% into it).
        // Identical visual state. Loop achieved.
        const gradientColors = [...config.colors, ...config.colors].join(', ');

        const styleId = 'gradient-text-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @keyframes gradient-flow {
                    0% { background-position: 80% 50%; }
                    100% { background-position: 20% 50%; }
                }
                
                .gradient-text-active {
                    position: relative;
                    background-image: linear-gradient(to right, ${gradientColors});
                    background-size: 600% 100%;
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
