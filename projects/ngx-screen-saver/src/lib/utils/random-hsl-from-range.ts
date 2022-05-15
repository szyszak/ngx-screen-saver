import p5 from 'p5';

export const randomHslFromRange = (
  p5: p5,
  hue: number,
  margin: number
): p5.Color => {
  let randomNumber = p5.random(hue - margin, hue + margin);

  if (randomNumber < 0) {
    randomNumber = 360 - randomNumber;
  }

  if (randomNumber > 360) {
    randomNumber = randomNumber - 360;
  }

  p5.colorMode(p5.HSL);

  return p5.color(randomNumber, 100, 50);
};
