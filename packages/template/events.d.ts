// events.d.ts
import {ArtDmx} from 'artnet-protocol/dist/protocol';
import 'vite/types/customEvent';

declare module 'vite/types/customEvent' {
  interface CustomEventMap {
    'dmx:data': ArtDmx;
    // 'event-key': payload
  }
}
