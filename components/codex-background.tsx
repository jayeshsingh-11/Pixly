"use client";

import { useEffect, useRef } from "react";

export function CodexBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = 0;
        let h = 0;
        let animationFrameId: number;
        let time = 0;

        const mouse = { x: 0.5, y: 0.5 };
        const target = { x: 0.5, y: 0.5 };

        // New Pastel/Vaporwave Palette
        const colors = [
            "#f472b6", // Pink 400
            "#22d3ee", // Cyan 400
            "#c084fc", // Purple 400
            "#fbbf24", // Amber 400
            "#2dd4bf", // Teal 400
        ];

        // --- PARTICLES (Background Depth) ---
        const particles: Particle[] = [];
        const particleCount = 20;

        class Particle {
            x: number;
            y: number;
            baseRadius: number;
            radius: number;
            color: string;
            speedX: number;
            speedY: number;
            angle: number;
            z: number;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.z = Math.random() * 0.8 + 0.2;
                this.baseRadius = (Math.random() * 100 + 100) * this.z;
                this.radius = this.baseRadius;
                this.color = colors[Math.floor(Math.random() * colors.length)];

                const speedScale = this.z * 0.5;
                this.speedX = (Math.random() * 0.4 - 0.2) * speedScale;
                this.speedY = (Math.random() * 0.4 - 0.2) * speedScale;
                this.angle = Math.random() * Math.PI * 2;
            }

            update(mouseX: number, mouseY: number) {
                this.angle += 0.002 * this.z;
                this.x += Math.cos(this.angle) * this.z + this.speedX;
                this.y += Math.sin(this.angle) * this.z + this.speedY;

                const dx = this.x - mouseX * w;
                const dy = this.y - mouseY * h;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const interactRadius = 300;

                if (distance < interactRadius) {
                    const factor = 1 - distance / interactRadius;
                    const targetRadius = this.baseRadius + (this.baseRadius * 0.5 * factor);
                    this.radius += (targetRadius - this.radius) * 0.1;
                } else {
                    this.radius += (this.baseRadius - this.radius) * 0.05;
                }

                const buffer = this.radius * 2;
                if (this.x < -buffer) this.x = w + buffer;
                if (this.x > w + buffer) this.x = -buffer;
                if (this.y < -buffer) this.y = h + buffer;
                if (this.y > h + buffer) this.y = -buffer;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.save();
                ctx.translate(this.x, this.y);
                const alpha = 0.5 * this.z;
                const g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
                g.addColorStop(0, this.color);
                g.addColorStop(1, "transparent");
                ctx.globalAlpha = alpha;
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // --- CODE CONSTELLATION ---
        interface TrailChar {
            x: number;
            y: number;
            char: string;
            age: number; // 1.0 to 0
            angle: number;
            size: number;
            color: string; // Dynamic color per character
        }
        const trail: TrailChar[] = [];
        const syntaxChars = ["<", ">", "/", "-", "{", "}", "[", "]", "*", ";", "_"];

        let mouseMoveCount = 0;

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            target.x = e.clientX / w;
            target.y = e.clientY / h;

            mouseMoveCount++;
            if (mouseMoveCount % 2 === 0) {
                trail.push({
                    x: e.clientX,
                    y: e.clientY,
                    char: syntaxChars[Math.floor(Math.random() * syntaxChars.length)],
                    age: 1.0,
                    angle: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 10 + 12,
                    color: colors[Math.floor(Math.random() * colors.length)] // Assign random pastel color
                });
            }
        };

        const lerp = (a: number, b: number, t: number) => {
            return a + (b - a) * t;
        };

        const draw = () => {
            time += 0.005;
            mouse.x = lerp(mouse.x, target.x, 0.05);
            mouse.y = lerp(mouse.y, target.y, 0.05);

            // Lighter Navy Background
            ctx.fillStyle = "#1a1b26"; // Tokyo Night / Lighter Navy
            ctx.fillRect(0, 0, w, h);

            ctx.globalCompositeOperation = "lighter";

            // Mouse Glow
            const mx = mouse.x * w;
            const my = mouse.y * h;
            const bgGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 800);
            bgGlow.addColorStop(0, "rgba(244, 114, 182, 0.15)"); // Pinkish glow
            bgGlow.addColorStop(1, "transparent");
            ctx.fillStyle = bgGlow;
            ctx.fillRect(0, 0, w, h);

            // Background Particles
            particles.forEach(p => {
                p.update(mouse.x, mouse.y);
                p.draw(ctx);
            });

            // Code Constellation
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // 1. Update trail ages
            for (let i = trail.length - 1; i >= 0; i--) {
                const p = trail[i];
                p.age -= 0.015;
                p.y -= 0.5; // Rise
                if (p.age <= 0) trail.splice(i, 1);
            }

            // 2. Draw Connections (Web)
            ctx.strokeWidth = 1;
            for (let i = 0; i < trail.length; i++) {
                const p1 = trail[i];
                for (let j = i + 1; j < trail.length; j++) {
                    const p2 = trail[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 80) {
                        const alpha = 0.4 * p1.age * p2.age;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`; // White connections for pastel look
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // 3. Draw Characters (Nodes)
            for (let i = 0; i < trail.length; i++) {
                const p = trail[i];
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);

                ctx.font = `${p.size}px monospace`;
                ctx.shadowBlur = 8 * p.age;
                ctx.shadowColor = p.color; // Glows with its assigned color
                ctx.fillStyle = `rgba(255, 255, 255, ${p.age})`;

                ctx.fillText(p.char, 0, 0);
                ctx.restore();
            }

            ctx.globalCompositeOperation = "source-over";
            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
        </div>
    );
}
