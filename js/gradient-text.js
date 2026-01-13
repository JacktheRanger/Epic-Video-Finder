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
        animationSpeed: 4.5, // seconds
        colors: ['#5227ff', '#ff9ffc', '#b19eef', '#9d2a2a', '#ffd700'],
        yoyo: false // false = continuous flow
    };

    target.addEventListener('split-text-complete', () => {
        // console.log('GradientText: Activating');

        // 1. Inject CSS styles dynamically
        // Double the colors for seamless looping if not yoyo
        const gradientColors = [...config.colors, config.colors[0]].join(', ');

        const styleId = 'gradient-text-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @keyframes gradient-flow {
                    0% { background-position: 100% 50%; }
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
