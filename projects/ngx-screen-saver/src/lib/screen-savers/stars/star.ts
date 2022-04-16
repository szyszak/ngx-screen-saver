import * as p5 from 'p5';

export class Star {
  constructor(private p5: p5, private x: number, private y: number) {}

  MAX_SIZE: number = 5;

  size: number = 1;
  decay: boolean = false;
  destroy: boolean = false;

  growth = this.p5.random(15, 50) / 500;

  update() {
    if (this.decay === false) {
      this.size = this.size + this.growth;
    }

    if (this.decay === true) {
      this.size = this.size - this.growth;
    }

    if (this.size >= this.MAX_SIZE) {
      this.decay = true;
    }

    if (this.size <= 0) {
      this.destroy = true;
    }
  }

  draw() {
    this.p5.noStroke();
    this.p5.fill(255);

    this.p5.circle(this.x, this.y, this.size);
  }
}
