import {Plugin, PLUGIN_OPTIONS} from '@motion-canvas/vite-plugin';
import {ArtNetController} from 'artnet-protocol/dist';
import {ArtDmx} from 'artnet-protocol/dist/protocol';

function debounce(func: Function, delay: number, ...args: any) {
  let timeoutId: NodeJS.Timeout;

  return function (dmxData: ArtDmx) {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

export default function viteArtNetListener(): Plugin {
  return {
    name: 'motion-canvas-artnet',

    // extend the dev server using Vite plugin hooks:
    configureServer(server) {
      server.ws.on('connection', () => {
        const controller = new ArtNetController();
        console.log('binding');
        controller.bind('10.102.254.113');
		
        function handler(dmx: ArtDmx) {
          console.log('dmx', dmx.data.slice(0, 4));
          server.ws.send('dmx:data', dmx.data.slice(0, 4));
        }
        controller.on('dmx', handler);

        server.ws.on('presenter', msg => {
          console.log('message received:', msg);
        });
        console.log('server.ws', server.ws);
      });
    },
    [PLUGIN_OPTIONS]: {
      entryPoint: './artNetExecutor.ts',
    },
  };
}
