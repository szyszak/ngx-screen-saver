import p5 from 'p5';

export const dvd = (p5: p5) => {
  const width = p5.windowWidth;
  const height = p5.windowHeight;

  let dvdLogo: p5.Image;

  let posX = 300;
  let posY = 100;
  let velX: number;
  let velY: number;

  // PRELOAD
  p5.preload = () => {
    dvdLogo = p5.loadImage('assets/ngx-screen-saver/dvd_logo.png');
  };

  // SETUP
  p5.setup = () => {
    p5.createCanvas(width, height).addClass('ngx-screen-saver');
    p5.background(0);

    velX = 7;
    velY = 5;
  };

  // DRAW
  p5.draw = () => {
    p5.background(0);
    p5.image(dvdLogo, posX, posY);

    posX = posX + velX;
    posY = posY + velY;

    if (posX + dvdLogo.width >= width || posX <= 0) {
      velX = -velX;
    }

    if (posY + dvdLogo.height >= height || posY <= 0) {
      velY = -velY;
    }
  };
};
