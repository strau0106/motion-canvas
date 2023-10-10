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
let opacityWasAtThreshold: Boolean;
let lastSlideWasAtZero: Boolean;
let nextSlideWasAtZero: Boolean;
const THRESHOLD = 250;
function handler2(dmxData: number[], presenter: Presenter) {
  if (!currentScene && dmxData[0] > 0) {
    currentScene = presenter.scenes.filter(
      scene => scene.playback.state === PlaybackState.Presenting,
    )[0];
  }
  if (currentScene) {
    if (dmxData[1] > THRESHOLD && !opacityWasAtThreshold) {
		opacityWasAtThreshold = true;
    }
    if (dmxData[1] === 0 && opacityWasAtThreshold) {
      opacityWasAtThreshold = false;
      presenter.requestNextSlide();
    }
	if (dmxData[2] === 0 && !lastSlideWasAtZero) {
		lastSlideWasAtZero = true;
	}
	if (dmxData[2] === 102 && lastSlideWasAtZero) {
		lastSlideWasAtZero = false;
		presenter.requestFirstSlide();
	} else if (dmxData[2] > 0 && lastSlideWasAtZero) {
		lastSlideWasAtZero = false;
		presenter.requestPreviousSlide();
	}
	if (dmxData[3] === 0 && !nextSlideWasAtZero) {
		nextSlideWasAtZero = true;
	}
	if (dmxData[3] > 0 && nextSlideWasAtZero) {
		nextSlideWasAtZero = false;
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
