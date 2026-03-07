import type { AfterViewInit, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Component, input, viewChild } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

@Component({
  selector: 'app-singularity-background',
  template: `
    <canvas
      #canvas
      class="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    ></canvas>
  `,
  styles: [
    `:host { display: block; position: fixed; inset: 0; z-index: -1; pointer-events: none; }`,
  ],
})
export class SingularityBackground implements OnInit, AfterViewInit, OnDestroy {
  readonly intensity = input<number>(1.0);

  private readonly canvasRef =
    viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameId = 0;
  private particles: Particle[] = [];
  private resizeObserver: ResizeObserver | null = null;
  private reducedMotion = false;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private time = 0;

  private static readonly PARTICLE_COUNT = 220;
  private static readonly SINGULARITY_X_RATIO = 0.85;
  private static readonly SINGULARITY_Y_RATIO = 0.5;
  private static readonly GRAVITY_STRENGTH = 8000;
  private static readonly MAX_FORCE = 2.5;
  private static readonly RING_COUNT = 4;
  /** Golden angle (~137.5°) for uniform angular distribution of stream lines */
  private static readonly GOLDEN_ANGLE = 137.5;

  ngOnInit(): void {
    this.reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.dpr = window.devicePixelRatio || 1;
    this.setupResize(canvas);
    this.initParticles();

    if (!this.reducedMotion) {
      this.animate();
    } else {
      this.drawFrame();
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.resizeObserver?.disconnect();
  }

  private setupResize(canvas: HTMLCanvasElement): void {
    const resize = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      canvas.width = this.width * this.dpr;
      canvas.height = this.height * this.dpr;
      canvas.style.width = `${this.width}px`;
      canvas.style.height = `${this.height}px`;
      this.ctx?.scale(this.dpr, this.dpr);
    };

    resize();

    this.resizeObserver = new ResizeObserver(() => {
      resize();
      if (this.reducedMotion) {
        this.drawFrame();
      }
    });
    this.resizeObserver.observe(document.documentElement);
  }

  private initParticles(): void {
    this.particles = [];
    for (let i = 0; i < SingularityBackground.PARTICLE_COUNT; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    // Concentrate more particles on the left 60%
    const xBias = Math.random() * Math.random();
    return {
      x: xBias * this.width * 0.8,
      y: Math.random() * this.height,
      vx: 0.15 + Math.random() * 0.35,
      vy: (Math.random() - 0.5) * 0.3,
      size: 1 + Math.random() * 1.8,
      alpha: 0.1 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
    };
  }

  private animate(): void {
    this.time += 0.008;
    this.updateParticles();
    this.drawFrame();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  private updateParticles(): void {
    const sx = this.width * SingularityBackground.SINGULARITY_X_RATIO;
    const sy = this.height * SingularityBackground.SINGULARITY_Y_RATIO;
    const intensityVal = this.intensity();

    for (const p of this.particles) {
      const dx = sx - p.x;
      const dy = sy - p.y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);

      // Gravity-like pull toward the singularity
      if (dist > 5) {
        const force = Math.min(
          SingularityBackground.GRAVITY_STRENGTH / distSq,
          SingularityBackground.MAX_FORCE,
        );
        p.vx += (dx / dist) * force * intensityVal * 0.3;
        p.vy += (dy / dist) * force * intensityVal * 0.3;
      }

      // Subtle vertical oscillation
      p.vy += Math.sin(this.time * 2 + p.phase) * 0.008;

      // Damping to prevent runaway speeds
      p.vx *= 0.995;
      p.vy *= 0.995;

      p.x += p.vx;
      p.y += p.vy;

      // Respawn particles that reach the singularity or go offscreen
      if (dist < 15 || p.x > this.width + 10 || p.y < -10 || p.y > this.height + 10) {
        this.respawnParticle(p);
      }
    }
  }

  private respawnParticle(p: Particle): void {
    const xBias = Math.random() * Math.random();
    p.x = xBias * this.width * 0.4;
    p.y = Math.random() * this.height;
    p.vx = 0.15 + Math.random() * 0.35;
    p.vy = (Math.random() - 0.5) * 0.3;
    p.alpha = 0.1 + Math.random() * 0.35;
    p.phase = Math.random() * Math.PI * 2;
  }

  private drawFrame(): void {
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, this.width, this.height);

    this.drawStreamLines(ctx);
    this.drawParticles(ctx);
    this.drawSingularity(ctx);
    this.drawRings(ctx);
    this.drawJet(ctx);
  }

  private drawParticles(ctx: CanvasRenderingContext2D): void {
    const sx = this.width * SingularityBackground.SINGULARITY_X_RATIO;
    const intensityVal = this.intensity();

    for (const p of this.particles) {
      const progressX = p.x / this.width;
      // Particles get brighter as they approach the singularity
      const proximityBoost = progressX > 0.5 ? (progressX - 0.5) * 0.4 : 0;

      // Transition color from blue to slightly orange near singularity
      const nearSingularity = Math.max(0, 1 - Math.abs(p.x - sx) / (this.width * 0.3));
      const r = Math.round(120 + nearSingularity * 80);
      const g = Math.round(160 + nearSingularity * 10);
      const b = Math.round(220 - nearSingularity * 60);
      const alpha = Math.min((p.alpha + proximityBoost) * intensityVal, 0.6);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();
    }
  }

  private drawStreamLines(ctx: CanvasRenderingContext2D): void {
    const sx = this.width * SingularityBackground.SINGULARITY_X_RATIO;
    const sy = this.height * SingularityBackground.SINGULARITY_Y_RATIO;
    const intensityVal = this.intensity();

    // Draw faint curved stream paths converging toward the singularity
    for (let i = 0; i < 6; i++) {
      const startX = this.width * (0.1 + i * 0.08);
      const startY = this.height * (0.15 + ((i * SingularityBackground.GOLDEN_ANGLE) % 360) / 360 * 0.7);
      const cpX = (startX + sx) * 0.5 + Math.sin(this.time + i) * 40;
      const cpY = (startY + sy) * 0.5 + Math.cos(this.time + i * 0.7) * 30;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(cpX, cpY, sx, sy);
      ctx.strokeStyle = `rgba(150, 180, 240, ${0.04 * intensityVal})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }

  private drawSingularity(ctx: CanvasRenderingContext2D): void {
    const sx = this.width * SingularityBackground.SINGULARITY_X_RATIO;
    const sy = this.height * SingularityBackground.SINGULARITY_Y_RATIO;
    const intensityVal = this.intensity();
    const baseRadius = Math.min(this.width, this.height) * 0.12;

    // Subtle pulsing
    const pulse = 1 + Math.sin(this.time * 1.5) * 0.05;
    const radius = baseRadius * pulse;

    const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius);
    gradient.addColorStop(0, `rgba(230, 140, 40, ${0.5 * intensityVal})`);
    gradient.addColorStop(0.2, `rgba(230, 140, 40, ${0.25 * intensityVal})`);
    gradient.addColorStop(0.5, `rgba(230, 140, 40, ${0.08 * intensityVal})`);
    gradient.addColorStop(1, 'rgba(230, 140, 40, 0)');

    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Brighter core
    const coreGradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 0.15);
    coreGradient.addColorStop(0, `rgba(255, 180, 80, ${0.6 * intensityVal})`);
    coreGradient.addColorStop(1, 'rgba(255, 180, 80, 0)');

    ctx.beginPath();
    ctx.arc(sx, sy, radius * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = coreGradient;
    ctx.fill();
  }

  private drawRings(ctx: CanvasRenderingContext2D): void {
    const sx = this.width * SingularityBackground.SINGULARITY_X_RATIO;
    const sy = this.height * SingularityBackground.SINGULARITY_Y_RATIO;
    const intensityVal = this.intensity();
    const baseRadius = Math.min(this.width, this.height) * 0.12;

    for (let i = 1; i <= SingularityBackground.RING_COUNT; i++) {
      const ringRadius = baseRadius * (0.3 + i * 0.25);
      const alpha = (0.15 - i * 0.03) * intensityVal;
      if (alpha <= 0) continue;

      ctx.beginPath();
      ctx.arc(sx, sy, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(230, 140, 40, ${alpha})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
  }

  private drawJet(ctx: CanvasRenderingContext2D): void {
    const sx = this.width * SingularityBackground.SINGULARITY_X_RATIO;
    const sy = this.height * SingularityBackground.SINGULARITY_Y_RATIO;
    const intensityVal = this.intensity();
    const jetLength = this.height * 0.25;

    // Vertical jet line through the singularity
    const gradient = ctx.createLinearGradient(sx, sy - jetLength, sx, sy + jetLength);
    gradient.addColorStop(0, 'rgba(230, 140, 40, 0)');
    gradient.addColorStop(0.35, `rgba(230, 140, 40, ${0.06 * intensityVal})`);
    gradient.addColorStop(0.5, `rgba(230, 140, 40, ${0.12 * intensityVal})`);
    gradient.addColorStop(0.65, `rgba(230, 140, 40, ${0.06 * intensityVal})`);
    gradient.addColorStop(1, 'rgba(230, 140, 40, 0)');

    ctx.beginPath();
    ctx.moveTo(sx, sy - jetLength);
    ctx.lineTo(sx, sy + jetLength);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
