class DotGrid {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`DotGrid: Container with id '${containerId}' not found.`);
            return;
        }

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        // Configuration
        this.config = {
            dotSize: options.dotSize || 5,
            gap: options.gap || 15,
            baseColor: options.baseColor || "#271E37",
            activeColor: options.activeColor || "#5227FF",
            proximity: options.proximity || 120, // Mouse hover radius
            speedTrigger: options.speedTrigger || 100,
            shockRadius: options.shockRadius || 250, // Click radius
            shockStrength: options.shockStrength || 5,
            maxSpeed: options.maxSpeed || 5000,
            resistance: options.resistance || 0.9, // Damping 0-1 range for simple physics
            returnSpeed: options.returnDuration ? (1 / options.returnDuration) : 0.1 // Spring stiffness
        };

        // State
        this.dots = [];
        this.width = 0;
        this.height = 0;
        this.mouse = { x: -1000, y: -1000, clickX: -1000, clickY: -1000, clickTime: 0 };

        // Bind methods
        this.resize = this.resize.bind(this);
        this.animate = this.animate.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleClick = this.handleClick.bind(this);

        // Initialize
        this.init();
    }

    init() {
        window.addEventListener('resize', this.resize);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('click', this.handleClick);

        this.resize();
        this.animate();
    }

    resize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        // Handle High DPI (Retina) displays
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;

        // Enforce CSS size to match container
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;

        // Scale drawing context so all coordinates are in CSS pixels
        this.ctx.scale(dpr, dpr);

        this.createDots();
    }

    createDots() {
        this.dots = [];
        const { gap, dotSize } = this.config;
        const cols = Math.ceil(this.width / gap);
        const rows = Math.ceil(this.height / gap);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                this.dots.push({
                    x: i * gap + gap / 2,
                    y: j * gap + gap / 2,
                    baseX: i * gap + gap / 2,
                    baseY: j * gap + gap / 2,
                    vx: 0,
                    vy: 0
                });
            }
        }
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.clickX = e.clientX - rect.left;
        this.mouse.clickY = e.clientY - rect.top;
        this.mouse.clickTime = Date.now();

        // Apply shockwave immediately
        this.applyShockwave();
    }

    applyShockwave() {
        const { shockRadius, shockStrength } = this.config;

        this.dots.forEach(dot => {
            const dx = dot.x - this.mouse.clickX;
            const dy = dot.y - this.mouse.clickY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < shockRadius) {
                const force = (shockRadius - dist) / shockRadius;
                const angle = Math.atan2(dy, dx);

                dot.vx += Math.cos(angle) * force * shockStrength * 20; // Multiplier for visual impact
                dot.vy += Math.sin(angle) * force * shockStrength * 20;
            }
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        const { dotSize, baseColor, activeColor, proximity, resistance, returnSpeed } = this.config;

        this.dots.forEach(dot => {
            // Physics: Return to base
            const dxBase = dot.baseX - dot.x;
            const dyBase = dot.baseY - dot.y;

            // Simple spring force
            dot.vx += dxBase * returnSpeed * 0.5; // Tuned for visuals
            dot.vy += dyBase * returnSpeed * 0.5;

            // Mouse repulsion (hover effect)
            const dxMouse = this.mouse.x - dot.x;
            const dyMouse = this.mouse.y - dot.y;
            const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            if (distMouse < proximity) {
                const force = (proximity - distMouse) / proximity;
                const angle = Math.atan2(dyMouse, dxMouse);
                // Repel
                dot.vx -= Math.cos(angle) * force * 2;
                dot.vy -= Math.sin(angle) * force * 2;

                // Color change logic could go here
                this.ctx.fillStyle = activeColor;
            } else {
                // Check if moving fast for "active" color
                const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
                this.ctx.fillStyle = speed > 2 ? activeColor : baseColor;
            }

            // Resistance/Friction
            dot.vx *= 0.90; // Fixed damping for stability
            dot.vy *= 0.90;

            // Update position
            dot.x += dot.vx;
            dot.y += dot.vy;

            // Draw
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(this.animate);
    }
}
