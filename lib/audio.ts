"use client";

import { Howl } from "howler";

let instance: Howl | null = null;
let listeners = new Set<(playing: boolean) => void>();
let playing = false;

function emit() {
  for (const l of listeners) l(playing);
}

export function initAudio(src: string) {
  if (instance) return instance;
  instance = new Howl({
    src: [src],
    loop: true,
    volume: 0.35,
    html5: true,
  });
  return instance;
}

export function play() {
  if (!instance) return;
  instance.play();
  playing = true;
  emit();
}

export function pause() {
  if (!instance) return;
  instance.pause();
  playing = false;
  emit();
}

export function toggle() {
  playing ? pause() : play();
}

export function isPlaying() {
  return playing;
}

export function onChange(fn: (p: boolean) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
