import p5 from 'p5';
import { reverseLoop } from '../../utils/reverse-loop';

// lata sobie mis i pingwin, jak sie zderza wyskakuja serduszka

export class Emoji {
  constructor(
    private p5: p5,
    public x: number,
    public y: number,
    public emoji: string
  ) {}

  velX = this.p5.random(-5, 5);
  velY = this.p5.random(-5, 5);
  // velX = 12;
  // velY = 12;

  elem = this.p5
    .createSpan(this.emoji)
    .position(this.x, this.y)
    .addClass('emoji');

  elemWidth: number = Math.ceil(this.elem.elt.getBoundingClientRect().width);
  elemHeight: number = Math.ceil(this.elem.elt.getBoundingClientRect().height);

  // tutaj tez wykrywac kolizje?
  update() {
    this.x = this.x + this.velX;
    this.y = this.y + this.velY;

    if (this.x + this.elemWidth >= this.p5.windowWidth || this.x <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.elemHeight >= this.p5.windowHeight || this.y <= 0) {
      this.velY = -this.velY;
    }
  }

  draw() {
    this.elem.position(this.x, this.y);
  }

  setEmoji(emoji: string) {
    this.elem.elt.textContent = emoji;
  }
}

// 🐻💗🐧
const arr: Emoji[] = [];

export const penguin = (p5: p5) => {
  const width = p5.windowWidth;
  const height = p5.windowHeight;

  // SETUP
  p5.setup = () => {
    p5.createCanvas(width, height);

    // p5.background(0);

    arr.push(new Emoji(p5, 20, 20, '🐧'));
    arr.push(new Emoji(p5, 200, 200, '🐻'));
  };

  // DRAW
  p5.draw = () => {
    const [peng, bear] = arr;

    if (
      peng.x < bear.x + bear.elemWidth &&
      peng.x + peng.elemWidth > bear.x &&
      peng.y < bear.y + bear.elemHeight &&
      peng.y + peng.elemHeight > bear.y
    ) {
      console.log(`OMG COLLISION!!! frame: ${p5.frameCount}`);
      peng.setEmoji('😍');
      bear.setEmoji('😍');
    } else {
      peng.setEmoji('🐧');
      bear.setEmoji('🐻');
    }

    arr.forEach((item, idx) => {
      item.update();
      item.draw();
    });
  };
};
