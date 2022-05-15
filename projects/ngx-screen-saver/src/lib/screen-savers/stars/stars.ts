import p5 from 'p5';
import { reverseLoop } from '../../utils/reverse-loop';
import { Star } from './star';

const MAX_STARS = 100;
const starsArr: Star[] = [];

export const stars = (p5: p5) => {
  const width = p5.windowWidth;
  const height = p5.windowHeight;

  let backgroundImage: p5.Image;

  // PRELOAD
  p5.preload = () => {
    backgroundImage = p5.loadImage('assets/ngx-screen-saver/galaxy.jpg');
  };

  // SETUP
  p5.setup = () => {
    p5.createCanvas(width, height).addClass('ngx-screen-saver');

    p5.image(backgroundImage, 0, 0);

    for (let i = 0; i < MAX_STARS; i++) {
      const star = new Star(p5, p5.random(0, width), p5.random(0, height));

      starsArr.push(star);
    }
  };

  // DRAW
  p5.draw = () => {
    p5.image(backgroundImage, 0, 0);

    reverseLoop(starsArr, (star, idx) => {
      star.update();
      star.draw();

      if (star.destroy) {
        starsArr.splice(idx, 1);

        const newStar = new Star(p5, p5.random(0, width), p5.random(0, height));

        starsArr.push(newStar);
      }
    });
  };
};
