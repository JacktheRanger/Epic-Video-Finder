/**
 * Antigravity Animation - Vanilla Three.js Implementation
 * Ported from: https://github.com/DavidHDev/react-bits/blob/main/src/content/Animations/Antigravity/Antigravity.jsx
 */

(function () {
    // Configuration
    const config = {
        count: 290,
        magnetRadius: 10,
        ringRadius: 2.5,
        waveSpeed: 0.4,
        waveAmplitude: 1,
        particleSize: 1,
        lerpSpeed: 0.1,
        color: "#D97757", // Claude Red style
        autoAnimate: false,
        particleVariance: 1,
        rotationSpeed: 0,
        depthFactor: 1,
        pulseSpeed: 3,
        particleShape: "capsule", // 'capsule', 'sphere', 'box', 'tetrahedron'
        fieldStrength: 10,
        cameraPosition: [0, 0, 50],
        fov: 35
    };

    let container, camera, scene, renderer;
    let mesh;
    let particles = [];
    const dummy = new THREE.Object3D();

    // Mouse state
    const mouse = new THREE.Vector2(0, 0); // Normalized -1 to 1
    const virtualMouse = new THREE.Vector2(0, 0);
    const lastMousePos = { x: 0, y: 0 };
    const lastMouseMoveTime = 0;

    // Clock
    const clock = new THREE.Clock();

    function init() {
        container = document.getElementById('antigravity-container');
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene
        scene = new THREE.Scene();
        // scene.background = new THREE.Color(0xffffff); // Optional background

        // Camera
        camera = new THREE.PerspectiveCamera(config.fov, width / height, 0.1, 1000);
        camera.position.set(...config.cameraPosition);

        // Renderer
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio); // High DPI support
        container.appendChild(renderer.domElement);

        // Geometry
        let geometry;
        switch (config.particleShape) {
            case 'capsule':
                // CapsuleGeometry(radius, length, capSegments, radialSegments)
                // Note: standard Three.js CapsuleGeometry might ensure parameters align with the React-Three-Fiber args [0.1, 0.4, 4, 8]
                if (typeof THREE.CapsuleGeometry !== 'undefined') {
                    geometry = new THREE.CapsuleGeometry(0.1, 0.4, 4, 8);
                } else {
                    // Fallback if CapsuleGeometry is missing (older Three.js) - Use Cylinder with spheres
                    geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4, 8);
                }
                break;
            case 'sphere':
                geometry = new THREE.SphereGeometry(0.2, 16, 16);
                break;
            case 'box':
                geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
                break;
            case 'tetrahedron':
                geometry = new THREE.TetrahedronGeometry(0.3);
                break;
            default:
                geometry = new THREE.CapsuleGeometry(0.1, 0.4, 4, 8);
        }

        // Material
        const material = new THREE.MeshBasicMaterial({ color: config.color });

        // Instanced Mesh
        mesh = new THREE.InstancedMesh(geometry, material, config.count);
        scene.add(mesh);

        // Initialize Particles
        initParticles(width, height);

        // Events
        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);

        // Animation Loop
        animate();
    }

    function initParticles(width, height) {
        // Calculate viewport size at z=0 (approximately, since particles are near z=0)
        // For accurate viewport calculation in 3D:
        // Visible height at distance D = 2 * D * tan(vFOV / 2)
        const dist = camera.position.z;
        const vFOV = THREE.MathUtils.degToRad(camera.fov);
        const viewHeight = 2 * dist * Math.tan(vFOV / 2);
        const viewWidth = viewHeight * (width / height);

        particles = [];
        for (let i = 0; i < config.count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;

            // Random initial positions
            const x = (Math.random() - 0.5) * viewWidth;
            const y = (Math.random() - 0.5) * viewHeight;
            const z = (Math.random() - 0.5) * 20;

            const randomRadiusOffset = (Math.random() - 0.5) * 2;

            particles.push({
                t,
                factor,
                speed,
                mx: x, // home x
                my: y, // home y
                mz: z, // home z
                cx: x, // current x
                cy: y, // current y
                cz: z, // current z
                randomRadiusOffset
            });
        }
    }

    function onMouseMove(event) {
        const rect = container.getBoundingClientRect();
        // Normalized Coordinates: -1 to +1
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function onWindowResize() {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    function animate() {
        requestAnimationFrame(animate);

        const time = clock.getElapsedTime();
        const dist = camera.position.z;
        const vFOV = THREE.MathUtils.degToRad(camera.fov);
        const viewHeight = 2 * dist * Math.tan(vFOV / 2);
        const viewWidth = viewHeight * camera.aspect;

        // Virtual Mouse smoothing
        // Convert normalized mouse to world coordinates (at z=0)
        let destX = (mouse.x * viewWidth) / 2;
        let destY = (mouse.y * viewHeight) / 2;

        const smoothFactor = 0.05;
        virtualMouse.x += (destX - virtualMouse.x) * smoothFactor;
        virtualMouse.y += (destY - virtualMouse.y) * smoothFactor;

        const targetX = virtualMouse.x;
        const targetY = virtualMouse.y;

        const globalRotation = time * config.rotationSpeed;

        for (let i = 0; i < config.count; i++) {
            const p = particles[i];

            p.t += p.speed / 2;

            // Projection factor (parallax effect based on Z depth)
            // Original: const projectionFactor = 1 - cz / 50; 
            // In Threejs logic: depth from camera. But here we stick to the original logic
            const projectionFactor = 1 - p.cz / 50;
            const projectedTargetX = targetX * projectionFactor;
            const projectedTargetY = targetY * projectionFactor;

            // Distance from particle home to "projected" mouse
            const dx = p.mx - projectedTargetX;
            const dy = p.my - projectedTargetY;
            const distSq = dx * dx + dy * dy;
            const distVal = Math.sqrt(distSq);

            let targetPos = { x: p.mx, y: p.my, z: p.mz * config.depthFactor };

            // Magnet Interaction
            if (distVal < config.magnetRadius) {
                const angle = Math.atan2(dy, dx) + globalRotation;
                const wave = Math.sin(p.t * config.waveSpeed + angle) * (0.5 * config.waveAmplitude);
                const deviation = p.randomRadiusOffset * (5 / (config.fieldStrength + 0.1));
                const currentRingRadius = config.ringRadius + wave + deviation;

                targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
                targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
                targetPos.z = p.mz * config.depthFactor + Math.sin(p.t) * (1 * config.waveAmplitude * config.depthFactor);
            }

            // Lerp to target
            p.cx += (targetPos.x - p.cx) * config.lerpSpeed;
            p.cy += (targetPos.y - p.cy) * config.lerpSpeed;
            p.cz += (targetPos.z - p.cz) * config.lerpSpeed;

            // Update Instance Matrix
            dummy.position.set(p.cx, p.cy, p.cz);
            dummy.lookAt(projectedTargetX, projectedTargetY, p.cz);
            dummy.rotateX(Math.PI / 2); // Adjust rotation to face roughly towards mouse? Or just orientation style.

            // Scale logic
            const currentDistToMouse = Math.sqrt(
                Math.pow(p.cx - projectedTargetX, 2) + Math.pow(p.cy - projectedTargetY, 2)
            );
            const distFromRing = Math.abs(currentDistToMouse - config.ringRadius);
            let scaleFactor = 1 - distFromRing / 10;
            scaleFactor = Math.max(0, Math.min(1, scaleFactor));

            const finalScale = scaleFactor * (0.8 + Math.sin(p.t * config.pulseSpeed) * 0.2 * config.particleVariance) * config.particleSize;
            dummy.scale.set(finalScale, finalScale, finalScale);

            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
        renderer.render(scene, camera);
    }

    // Start
    window.addEventListener('DOMContentLoaded', init);

})();
