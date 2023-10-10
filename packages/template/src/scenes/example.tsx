/*import {makeScene2D, Circle, Txt,} from '@motion-canvas/2d';
import {waitFor, waitUntil, createRef, beginSlide, useScene} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const circle = createRef<Circle>();
  const opacitySignal = useScene().variables.get('fade', 0);
  const circle2 = createRef<Circle>();

  view.add(
    <Circle ref={circle} width={320} height={320} fill={'lightseagreen'} />,
  );

  
  
  view.add(
    <Txt text={() => `Opacity = ${opacitySignal()}`} x={15} fill={15}></Txt>
  );

  
  yield*  beginSlide('circle');
  yield* circle().scale(2, 2).to(1, 2);
  yield* beginSlide('circle2');
  yield* circle().fill('red', 1);
  yield* circle().fill('blue', 1);
  yield* beginSlide('circle3');

  
});
*/

import {makeScene2D, Circle, Txt, Img, Node} from '@motion-canvas/2d';
import {
  waitFor,
  waitUntil,
  createRef,
  beginSlide,
  useScene,
  createSignal,
} from '@motion-canvas/core';

import Friedhofstor from '../images/Friedhofstor.jpg';
import Wald from '../images/Wald.jpeg';

const images = [Friedhofstor, Wald];

export default makeScene2D(function* (view) {
  const opacitySignal = createSignal(
    () => useScene().variables.get('fade', 0)() / 255,
  );
  const opacities = createSignal(() => {
    return [1 - opacitySignal(), opacitySignal()];
  });
  const imageIndex = createSignal(0);

  view.add(
    <Node
      spawner={images
        .slice(imageIndex(), imageIndex() + 1)
        .map((image, index) => (
          <Img
            src={image}
            x={0}
            y={0}
            width={1920}
            height={1080}
            opacity={opacities()[index]}
          />
        ))}
    ></Node>,
  );
  yield* beginSlide(`image0`);
  for (const image of images) {
    imageIndex(imageIndex() + 1);
    yield* beginSlide(`image${imageIndex()}`);
  }
});
