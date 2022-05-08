import p5 from 'p5';

export class Particle {
  constructor(
    private p5: p5,
    public pos: p5.Vector,
    public vel: p5.Vector,
    public size: number,
    public color: p5.Color,
    public rotation?: number
  ) {
    if (this.rotation) {
      this.vel.rotate(this.rotation);
      this.vel.setMag(this.p5.random(1, 2));
    }
  }

  update() {
    this.pos.add(this.vel);
  }

  draw() {
    this.p5.noStroke();
    this.p5.fill(this.color);

    this.p5.circle(this.pos.x, this.pos.y, this.size);
  }
}
