import { Howl } from "howler";
import { counter, whistle, stroke, box } from "../assets/sounds";
import type { Sounds, TESounds } from "../interfaces";

const SOUNDS: Sounds = {
  COUNTER: new Howl({
    src: [counter],
  }),
  WHISTLE: new Howl({
    src: [whistle],
  }),
  STROKE: new Howl({
    src: [stroke],
  }),
  BOX: new Howl({
    src: [box],
  }),
};

export const playSound = (type: TESounds) => {
  SOUNDS[type].play();
};
