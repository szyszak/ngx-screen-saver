import p5 from 'p5';
import { reverseLoop } from '../../utils/reverse-loop';
import { Firework } from './firework';

export const fireworks = (p5: p5) => {
  const WIDTH = p5.windowWidth;
  const HEIGHT = p5.windowHeight;
  const MAX_FIREWORKS: number = 10;

  const SAFE_MARGIN = 40;
  const SAFE_SPACE = {
    xStart: SAFE_MARGIN,
    xEnd: WIDTH - SAFE_MARGIN,
    yStart: 0,
    yEnd: HEIGHT - SAFE_MARGIN,
  };

  const fireworksArr: Firework[] = [];

  let backgroundImg: p5.Image;

  // PRELOAD
  p5.preload = () => {
    backgroundImg = p5.loadImage('assets/fireworks_bg.jpg');
  };

  // SETUP
  p5.setup = () => {
    p5.createCanvas(WIDTH, HEIGHT).addClass('ngx-screen-saver');
    p5.angleMode(p5.DEGREES);

    backgroundImg.resize(WIDTH, HEIGHT);

    for (let i = 0; i < MAX_FIREWORKS; i++) {
      fireworksArr.push(
        new Firework(
          p5,
          p5.random(SAFE_SPACE.xStart, SAFE_SPACE.xEnd),
          p5.random(SAFE_SPACE.yStart, SAFE_SPACE.yEnd)
        )
      );
    }
  };

  // DRAW
  p5.draw = () => {
    const heightOffset = HEIGHT - backgroundImg.height;

    p5.image(backgroundImg, 0, heightOffset);

    p5.translate(0, HEIGHT); // moves the origin to bottom left
    p5.scale(1, -1); // flips the y values so y increases "up"

    reverseLoop(fireworksArr, (firework, idx) => {
      firework.update();
      firework.draw();

      if (firework.phase === 'dispose') {
        fireworksArr.splice(idx, 1);

        fireworksArr.push(
          new Firework(
            p5,
            p5.random(SAFE_SPACE.xStart, SAFE_SPACE.xEnd),
            p5.random(SAFE_SPACE.yStart, SAFE_SPACE.yEnd)
          )
        );
      }
    });
  };
};
