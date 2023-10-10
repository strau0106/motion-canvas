import {
  makeScene2D,
  Circle,
  Txt,
  Img,
  Node,
  Layout,
  Rect,
} from '@motion-canvas/2d';
import {
  waitFor,
  waitUntil,
  createRef,
  beginSlide,
  useScene,
  createSignal,
} from '@motion-canvas/core';

import Slide1 from '../images/Slide1.jpg';
import Slide2 from '../images/Slide2.jpg';
import Slide3 from '../images/Slide3.jpg';
import Slide4 from '../images/Slide4.jpg';
import Slide5 from '../images/Slide5.jpg';
import Slide6 from '../images/Slide6.jpg';
import Slide7 from '../images/Slide7.jpg';
import Slide8 from '../images/Slide8.jpg';
import Slide9 from '../images/Slide9.jpg';
import Slide10 from '../images/Slide10.jpg';
import Slide11 from '../images/Slide11.jpg';
import Slide12 from '../images/Slide12.jpg';
import Slide13 from '../images/Slide13.jpg';
import Slide14 from '../images/Slide14.jpg';
import Slide15 from '../images/Slide15.jpg';
import Slide16 from '../images/Slide16.jpg';
import Slide17 from '../images/Slide17.jpg';
import Slide18 from '../images/Slide18.jpg';
import Slide19 from '../images/Slide19.jpg';
import Slide20 from '../images/Slide20.jpg';
import Slide21 from '../images/Slide21.jpg';

const images = [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  Slide8,
  Slide9,
  Slide10,
  Slide11,
  Slide12,
  Slide13,
  Slide14,
  Slide15,
  Slide16,
  Slide17,
  Slide18,
  Slide19,
  Slide20,
  Slide21,
];

export default makeScene2D(function* (view) {
  const opacitySignal = useScene().variables.get('opacity', 0);
  const imageSignal = useScene().variables.get('slide', 0);
  const imgRef = createRef<Img>();
  view.add(
    <Rect layout direction={'column'}>
      <Rect layout direction={'row'}>
        <Rect height={(11.44 / 14.29) * 1080}>
          <Rect fill={'black'} width={(5.08 / 25.04) * 1920}></Rect>
          <Img
            ref={imgRef}
            opacity={opacitySignal}
            width={(15 / 25.04) * 1920}
          />
          <Rect fill={'black'} width={(4.97 / 25.04) * 1920}></Rect>
        </Rect>
      </Rect>
      <Rect fill={'black'} height={(2.85 / 14.29) * 1080} width={1920}></Rect>
    </Rect>,
  );

  view.add(
    <Txt
      text={() => `Opacity = ${opacitySignal()}`}
      x={200}
      fill={'red'}
      height={100}
    ></Txt>,
  );
  for (const image of images) {
    imgRef().src(image);
    yield* beginSlide(`image${images.indexOf(image)}`);
  }
});
