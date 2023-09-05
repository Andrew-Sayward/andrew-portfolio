"use client";

import { useEffect } from "react";
import styles from "./text-canvas.module.scss";
import { Bangers } from "next/font/google";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

const TextCanvas = () => {
  useEffect(() => {
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      effect: any;
      x: number;
      y: any;
      color: any;
      originX: any;
      originY: any;
      size: any;
      dx: number;
      dy: number;
      vx: number;
      vy: number;
      force: number;
      angle: number;
      distance: number;
      friction: number;
      ease: number;
      constructor(effect: any, x: any, y: any, color: any) {
        this.effect = effect;
        this.x = Math.random() * this.effect.canvasWidth;
        this.y = this.effect.canvasHeight;
        this.color = color;
        this.originX = x;
        this.originY = y;
        this.size = this.effect.gap;
        this.dx = 0;
        this.dy = 0;
        this.vx = 0;
        this.vy = 0;
        this.force = 0;
        this.angle = 0;
        this.distance = 0;
        this.friction = Math.random() * 0.8 + 0.005;
        this.ease = Math.random() * 0.1 + 0.00087;
      }
      draw() {
        this.effect.context.fillStyle = this.color;
        this.effect.context.fillRect(this.x, this.y, this.size, this.size);
      }
      update() {
        this.dx = this.effect.mouse.x - this.x;
        this.dy = this.effect.mouse.y - this.y;
        this.distance = this.dx * this.dx + this.dy * this.dy;
        this.force = -this.effect.mouse.radius / this.distance;

        if (this.distance < this.effect.mouse.radius) {
          this.angle = Math.atan2(this.dy, this.dx);
          this.vx += this.force * Math.cos(this.angle);
          this.vy += this.force * Math.sin(this.angle);
        }

        this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
      }
    }

    class Effect {
      context: CanvasRenderingContext2D;
      canvasWidth: number;
      canvasHeight: number;
      textX: number;
      textY: number;
      fontSize: number;
      maxTextWidth: number;
      lineHeight: number;
      particles: Particle[];
      gap: number;
      mouse: { radius: number; x: number; y: number };
      verticalOffset: number;

      constructor(context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.textX = this.canvasWidth / 2;
        this.textY = this.canvasHeight / 2;
        this.fontSize = window.innerWidth < 767 ? 50 : 100;
        this.maxTextWidth = this.canvasWidth * 0.5;
        this.verticalOffset = 0;
        this.lineHeight = this.fontSize * 0.8;
        this.particles = [];
        this.gap = window.innerWidth < 767 ? 1 : 2;
        this.mouse = {
          radius: window.innerWidth < 767 ? 2000 : 10000,
          x: 0,
          y: 0,
        };
        window.addEventListener("mousemove", (e) => {
          this.mouse.x = e.x;
          this.mouse.y = e.y;
        });
        // Handle mouse movement
        window.addEventListener("mousemove", (e) => {
          this.mouse.x = e.x;
          this.mouse.y = e.y;
        });

        // Handle touch movement
        window.addEventListener("touchmove", (e) => {
          e.preventDefault(); // Prevent scrolling on touch
          this.mouse.x = e.touches[0].clientX;
          this.mouse.y = e.touches[0].clientY;
        });
      }
      wrapText(text: any) {
        const gradient = ctx.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
        gradient.addColorStop(0.3, "red");
        gradient.addColorStop(0.5, "orange");
        gradient.addColorStop(0.7, "yellow");
        this.context.fillStyle = gradient;
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.lineWidth = 2;
        this.context.strokeStyle = "white";
        this.context.font = this.fontSize + "px Arial Black";
        let linesArray = [];
        let words = text.split(" ");
        let lineCounter = 0;
        let line = "";
        for (let i = 0; i < words.length; i++) {
          let testLine = line + words[i] + " ";
          if (this.context.measureText(testLine).width > this.maxTextWidth) {
            line = words[i] + " ";
            lineCounter++;
          } else {
            line = testLine;
          }
          linesArray[lineCounter] = line;
        }
        let textHeight = this.lineHeight * lineCounter;
        let textY = this.canvasHeight / 2 - textHeight / 2 + this.verticalOffset;
        linesArray.forEach((el, index) => {
          this.context.fillText(el, this.canvasWidth / 2, textY + index * this.lineHeight);
          this.context.strokeText(el, this.canvasWidth / 2, textY + index * this.lineHeight);
        });
        this.convertToParticles();
      }
      convertToParticles() {
        this.particles = [];
        const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (let y = 0; y < this.canvasHeight; y += this.gap) {
          for (let x = 0; x < this.canvasWidth; x += this.gap) {
            const index = (y * this.canvasWidth + x) * 4;
            const alpha = pixels[index + 3];
            if (alpha > 0) {
              const red = pixels[index];
              const green = pixels[index + 1];
              const blue = pixels[index + 2];
              const color = "rgb(" + red + "," + green + "," + blue + ")";
              this.particles.push(new Particle(this, x, y, color));
            }
          }
        }
      }

      render() {
        this.particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });
      }
    }

    let effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText("I AM A FRONT-END WEB DEVELOPER");
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      effect.render();
      requestAnimationFrame(animate);
    }
    animate();

    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      effect = new Effect(ctx, canvas.width, canvas.height); // Re-initialize
      effect.wrapText("I AM A FRONT-END WEB DEVELOPER");
    }

    // Set up initial canvas dimensions
    init();

    // Start the animation loop
    animate();

    // Listen for window resizes and re-initialize
    window.addEventListener("resize", init);

    // Cleanup effect
    return () => {
      window.removeEventListener("resize", init);
    };
  });
  return (
    <section className={`${styles.textCanvas} min-h-screen`}>
      <canvas id="canvas"></canvas>
    </section>
  );
};

export default TextCanvas;
