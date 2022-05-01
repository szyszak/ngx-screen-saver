import p5lib from 'p5';

const p5 = new p5lib(() => {});

export const randomHslFromRange = (
  hue: number,
  margin: number
): p5lib.Color => {
  // wylosowana liczba nie moze byc mniejsza od 0 i wieksza od 360
  // hue nie moze byc mniejsze od 0 i wieksze od 360
  let randomNumber = p5.random(hue - margin, hue + margin);

  // console.log(`random hue before: ${randomNumber}`);

  if (randomNumber < 0) {
    // console.log('less than 0');

    randomNumber = 360 - randomNumber;
  }

  if (randomNumber > 360) {
    // console.log('more than 360');

    randomNumber = randomNumber - 360;
  }

  // console.log(`random hue after: ${randomNumber}`);

  p5.colorMode(p5.HSL);

  // czy dodatkowo zaokraglac?
  return p5.color(randomNumber, 100, 50);
};
