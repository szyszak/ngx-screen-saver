import p5 from 'p5';
import { randomHslFromRange } from '../../utils/random-hsl-from-range';
import { reverseLoop } from '../../utils/reverse-loop';

class Particle {
  constructor(
    private p5: p5,
    public pos: p5.Vector,
    public vel: p5.Vector,
    public size: number,
    public color: p5.Color,
    public lifeSpan: number
  ) {}

  dispose: boolean = false;

  update() {
    this.pos.add(this.vel);
  }

  draw() {
    this.p5.noStroke();
    this.p5.fill(this.color);

    this.p5.circle(this.pos.x, this.pos.y, this.size);
  }
}

class Firework {
  constructor(private p5: p5, public posX: number) {}

  pos = this.p5.createVector(this.posX, 0);
  vel = this.p5.createVector(0, 1);
  randomHue = this.p5.random(0, 360);

  phase: 'fly' | 'explode' | 'dispose' = 'fly';

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
          randomHslFromRange(30, 20),
          20
        )
      );

      if (this.fireParticles.length > 30) {
        this.fireParticles.splice(0, 1);
      }

      if (this.pos.y >= 100) {
        this.phase = 'explode';
      }
    }

    if (this.phase === 'explode') {
      if (this.fireParticles.length > 0) {
        this.fireParticles.splice(0, 1);
      }

      // tutaj wpychac do explosionParticles czasteczki ktore leca z this.pos w losowym kierunku (unit vector?)
      // znormalizowana dlugosc wektora ustawiac przez vector.setMag(number)
      if (this.explosionParticles.length < 100) {
        const newParticle = new Particle(
          this.p5,
          this.pos.copy(),
          this.p5.createVector(this.p5.random(-2, 2), this.p5.random(-2, 2)),
          5,
          randomHslFromRange(this.randomHue, 20),
          20
        );

        this.explosionParticles.push(newParticle);
      }
    }

    this.p5.pop();
  }

  draw() {
    this.p5.noStroke();

    // debug, do usuniecia po skonczeniu
    this.p5.fill(255);
    this.p5.circle(this.pos.x, this.pos.y, 5);

    if (this.fireParticles.length > 0) {
      reverseLoop(this.fireParticles, (particle, idx) => {
        particle.update();
        particle.draw();
      });
    }

    if (this.explosionParticles.length > 0) {
      reverseLoop(this.explosionParticles, (particle, idx) => {
        if (this.pos.dist(particle.pos) < 40) {
          particle.update();
          particle.draw();
        }
      });
    }
  }
}

const MAX_FIREWORKS: number = 10;
const fireworksArr: Firework[] = [];

export const fireworks = (p5: p5) => {
  const WIDTH = p5.windowWidth;
  const HEIGHT = p5.windowHeight;

  const SAFE_MARGIN = 40;
  const SAFE_SPACE = {
    xStart: SAFE_MARGIN,
    xEnd: WIDTH - SAFE_MARGIN,
    yStart: 0,
    yEnd: HEIGHT - SAFE_MARGIN,
  };

  // let backgroundImg: p5.Image;

  // PRELOAD
  // p5.preload = () => {
  // tutaj bedzie panorama miasta albo niebo noca
  // dvdLogo = p5.loadImage('assets/dvd_logo.png');
  // };

  // SETUP
  p5.setup = () => {
    p5.createCanvas(WIDTH, HEIGHT);
    p5.background(0);

    // p5.colorMode(p5.HSL);

    for (let i = 0; i < MAX_FIREWORKS; i++) {
      fireworksArr.push(
        new Firework(p5, p5.random(SAFE_SPACE.xStart, SAFE_SPACE.xEnd))
      );

      // console.log(fireworksArr[i].vel.toString());
    }
  };

  // DRAW
  p5.draw = () => {
    p5.background(0, 5);

    p5.translate(0, HEIGHT); // moves the origin to bottom left
    p5.scale(1, -1); // flips the y values so y increases "up"

    reverseLoop(fireworksArr, (firework, idx) => {
      firework.update();
      firework.draw();

      // if (firework.pos.y >= SAFE_SPACE.yEnd) {
      //   fireworksArr.splice(idx, 1);

      //   fireworksArr.push(
      //     new Firework(p5, p5.random(SAFE_SPACE.xStart, SAFE_SPACE.xEnd))
      //   );
      // }
    });
  };
};
