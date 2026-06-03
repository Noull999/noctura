"use client";

import { isPlaying } from "./audio";

/**
 * Generador de micro-sonidos sintéticos con Web Audio API.
 * No requiere archivos. Solo suena si el audio global del sitio está activado.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    } catch {
      return null;
    }
  }
  return ctx;
}

/**
 * Click metálico ritual — sonido corto, agudo, sutil.
 */
export function playClickSound() {
  if (!isPlaying()) return; // solo si el audio del sitio está activo
  const ac = getCtx();
  if (!ac) return;

  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const filter = ac.createBiquadFilter();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

  filter.type = "bandpass";
  filter.frequency.value = 1200;
  filter.Q.value = 6;

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.06, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);

  osc.start(now);
  osc.stop(now + 0.15);
}

/**
 * Hover susurro — muy sutil, ráfaga de aire/ruido.
 */
export function playHoverSound() {
  if (!isPlaying()) return;
  const ac = getCtx();
  if (!ac) return;

  const now = ac.currentTime;
  const bufferSize = ac.sampleRate * 0.08;
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.5;
  }

  const noise = ac.createBufferSource();
  noise.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 3500;

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.015, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);

  noise.start(now);
  noise.stop(now + 0.1);
}
