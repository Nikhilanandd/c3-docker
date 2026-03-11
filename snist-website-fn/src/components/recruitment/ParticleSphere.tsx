'use client';

import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

// ── Tuning ─────────────────────────────────────────────────
const PARTICLE_COUNT = 12_000;
const SPHERE_RADIUS = 120;
const PARTICLE_SIZE = 1.5;
const ROTATION_SPEED = 0.001;

// Sponge / slime interaction
const INFLUENCE_RADIUS = 60;      // how far from cursor the bulge extends
const PUSH_STRENGTH = 18;         // radial outward push strength
const SPRING_STIFFNESS = 0.045;   // how fast particles spring back (lower = gooier)
const DAMPING = 0.82;             // velocity damping per frame (lower = more viscous)

export default function ParticleSphere() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const frameIdRef = useRef<number>(0);

    const init = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        // ── Scene ──────────────────────────────────────────────
        const scene = new THREE.Scene();
        scene.background = null;

        // ── Camera ─────────────────────────────────────────────
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            1,
            1000,
        );
        camera.position.z = 350;

        // ── Renderer ───────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // ── Geometry — points on a sphere shell ────────────────
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
        const velocities = new Float32Array(PARTICLE_COUNT * 3); // per-particle velocity

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta);
            const y = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta);
            const z = SPHERE_RADIUS * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            velocities[i * 3] = 0;
            velocities[i * 3 + 1] = 0;
            velocities[i * 3 + 2] = 0;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // ── Material ───────────────────────────────────────────
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: PARTICLE_SIZE,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.85,
        });

        // ── Points mesh ────────────────────────────────────────
        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // ── Raycaster & mouse ──────────────────────────────────
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(9999, 9999);
        let mouseActive = false;

        const onMouseMove = (e: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            mouseActive = true;
        };

        const onMouseLeave = () => {
            mouseActive = false;
            mouse.set(9999, 9999);
        };

        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('mouseleave', onMouseLeave);

        // ── Resize handler ─────────────────────────────────────
        const onResize = () => {
            if (!container) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize);

        // ── Helpers ────────────────────────────────────────────
        const intersectPoint = new THREE.Vector3();
        const radialDir = new THREE.Vector3();

        // ── Animation loop ─────────────────────────────────────
        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);

            // Slow constant rotation
            points.rotation.y += ROTATION_SPEED;

            const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
            const posArray = posAttr.array as Float32Array;

            // Compute matrices
            points.updateMatrixWorld();
            const worldMatrix = points.matrixWorld;
            const inverseMatrix = new THREE.Matrix4().copy(worldMatrix).invert();

            // Raycast against an invisible sphere to find the 3D cursor point
            let hasIntersection = false;
            if (mouseActive) {
                raycaster.setFromCamera(mouse, camera);

                const sphere = new THREE.Sphere(
                    new THREE.Vector3().setFromMatrixPosition(worldMatrix),
                    SPHERE_RADIUS * 1.4,
                );
                hasIntersection = raycaster.ray.intersectSphere(sphere, intersectPoint) !== null;

                if (hasIntersection) {
                    intersectPoint.applyMatrix4(inverseMatrix);
                }
            }

            // ── Particle physics (sponge / slime) ──────────────
            const influenceSq = INFLUENCE_RADIUS * INFLUENCE_RADIUS;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const ix = i * 3;
                const iy = ix + 1;
                const iz = ix + 2;

                const ox = originalPositions[ix];
                const oy = originalPositions[iy];
                const oz = originalPositions[iz];

                // ── Mouse push — radially outward like a sponge ─
                if (hasIntersection) {
                    // Distance from this particle's REST position to the cursor hit
                    const dx = ox - intersectPoint.x;
                    const dy = oy - intersectPoint.y;
                    const dz = oz - intersectPoint.z;
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < influenceSq) {
                        const dist = Math.sqrt(distSq);
                        // Smooth cosine falloff (1 at center → 0 at edge)
                        const t = dist / INFLUENCE_RADIUS;
                        const falloff = 0.5 * (Math.cos(Math.PI * t) + 1);

                        // Push direction = radially outward from sphere center
                        // (through the particle's original position on the shell)
                        const rLen = Math.sqrt(ox * ox + oy * oy + oz * oz);
                        if (rLen > 0.001) {
                            radialDir.set(ox / rLen, oy / rLen, oz / rLen);

                            const push = PUSH_STRENGTH * falloff;
                            velocities[ix] += radialDir.x * push;
                            velocities[iy] += radialDir.y * push;
                            velocities[iz] += radialDir.z * push;
                        }
                    }
                }

                // ── Spring force back to rest position ──────────
                const springX = (ox - posArray[ix]) * SPRING_STIFFNESS;
                const springY = (oy - posArray[iy]) * SPRING_STIFFNESS;
                const springZ = (oz - posArray[iz]) * SPRING_STIFFNESS;

                velocities[ix] = (velocities[ix] + springX) * DAMPING;
                velocities[iy] = (velocities[iy] + springY) * DAMPING;
                velocities[iz] = (velocities[iz] + springZ) * DAMPING;

                // Integrate velocity → position
                posArray[ix] += velocities[ix];
                posArray[iy] += velocities[iy];
                posArray[iz] += velocities[iz];
            }

            posAttr.needsUpdate = true;
            renderer.render(scene, camera);
        };

        animate();

        // ── Cleanup closure ────────────────────────────────────
        return () => {
            cancelAnimationFrame(frameIdRef.current);
            renderer.domElement.removeEventListener('mousemove', onMouseMove);
            renderer.domElement.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('resize', onResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    useEffect(() => {
        const cleanup = init();
        return () => cleanup?.();
    }, [init]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: 'transparent' }}
        />
    );
}
