import p5 from 'p5';
import { randomHslFromRange } from '../../utils/random-hsl-from-range';
import { reverseLoop } from '../../utils/reverse-loop';
import { Particle } from './particle';

export class Firework {
  constructor(private p5: p5, public posX: number, public maxHeight: number) {}

  pos = this.p5.createVector(this.posX, 0);
  vel = this.p5.createVector(0, this.p5.random(1.5, 2.5));
  randomHue = this.p5.random(0, 360);

  phase: 'fly' | 'explode' | 'dispose' = 'fly';

  explosionParticlesCreated: boolean = false;

  fireParticles: Particle[] = [];
  explosionParticles: Particle[] = [];

  update() {
    this.p5.push();
    this.p5.colorMode(this.p5.HSL);

    if (this.phase === 'fly') {
      this.pos.add(this.vel);

      this.fireParticles.push(
        new Particle(
          this.p5,
          this.p5.createVector(
            this.pos.x + this.p5.random(-2, 2),
            this.pos.y + this.p5.random(-2, 2)
          ),
          this.p5.createVector(0, 0),
          3,
          randomHslFromRange(this.p5, 30, 20)
        )
      );

      if (this.fireParticles.length > 30) {
        this.fireParticles.splice(0, 1);
      }

      if (this.pos.y >= this.maxHeight) {
        this.phase = 'explode';
      }
    }

    if (this.phase === 'explode') {
      if (this.fireParticles.length > 0) {
        this.fireParticles.splice(0, 1);
      }

      if (this.explosionParticlesCreated === false) {
        for (let i = 0; i < 150; i++) {
          const newParticle = new Particle(
            this.p5,
            this.pos.copy(),
            this.p5.createVector(1, 0),
            5,
            randomHslFromRange(this.p5, this.randomHue, 20),
            this.p5.random(0, 360)
          );

          this.explosionParticles.push(newParticle);
        }

        this.explosionParticlesCreated = true;
      }

      if (this.explosionParticles.length <= 0) {
        this.phase = 'dispose';
      }
    }

    this.p5.pop();
  }

  draw() {
    this.p5.noStroke();

    if (this.fireParticles.length > 0) {
      reverseLoop(this.fireParticles, (particle, idx) => {
        particle.update();
        particle.draw();
      });
    }

    if (this.explosionParticles.length > 0) {
      reverseLoop(this.explosionParticles, (particle, idx) => {
        if (this.pos.dist(particle.pos) <= 50) {
          particle.update();
          particle.draw();
        } else {
          this.explosionParticles.splice(idx, 1);
        }
      });
    }
  }
}
