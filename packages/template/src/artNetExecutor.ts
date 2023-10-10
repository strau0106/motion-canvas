import {Scene2D} from '@motion-canvas/2d';
import {
  FullSceneDescription,
  PlaybackState,
  Presenter,
  Project,
  makePlugin,
  Scene,
} from '@motion-canvas/core';
import {ArtDmx} from 'artnet-protocol/dist/protocol';

let currentScene: Scene<unknown>;

function handler(dmxData: number[], presenter: Presenter) {
  if (!currentScene && dmxData[0] > 0) {
    currentScene = presenter.scenes.filter(
      scene => scene.playback.state === PlaybackState.Presenting,
    )[0];
  }
  if (currentScene) {
    currentScene.variables.updateSignals({
      opacity: dmxData[1] / 255,
      slide: dmxData[2],
    });
  }
}

let slide: number = 0;
let wasAtThreshold: Boolean;
const THRESHOLD = 250;
function handler2(dmxData: number[], presenter: Presenter) {
  if (!currentScene && dmxData[0] > 0) {
    currentScene = presenter.scenes.filter(
      scene => scene.playback.state === PlaybackState.Presenting,
    )[0];
  }
  if (currentScene) {
    if (dmxData[1] > THRESHOLD && !wasAtThreshold) {
      wasAtThreshold = true;
    }
    if (dmxData[1] === 0 && wasAtThreshold) {
      slide++;
      wasAtThreshold = false;
      presenter.requestNextSlide();
    }
    currentScene.variables.updateSignals({
      opacity: dmxData[1] / 255,
    });
  }
}

export default makePlugin({
  name: 'artNetExecutor',
  presenter(presenter) {
    if (import.meta.hot) {
      import.meta.hot.send('connection');
      import.meta.hot.on('dmx:data', dmx => {
        console.log('dmx', dmx);
        handler2(dmx, presenter);
      });
    }
  },
});
